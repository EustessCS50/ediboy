import datetime
import json

from django.conf import settings
from django.contrib import messages
from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.core.mail import EmailMessage
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.template.loader import render_to_string

from .models import *

from .forms import RegisterForm, LoginForm
from .utils import cookieCart, cartData, guestOrder

from django.utils.translation import gettext as _
from django.utils.translation import get_language, activate, gettext

# Create your views here.


def mainPage(request):

    context = {}
    template = 'index.html'
    return render(request, template, context)


def lang(request):
    trans = translate(language='fr')
    return render(request, 'lang.html', {'trans': trans})


def translate(language):
    cur_language = get_language()
    try:
        activate(language)
        text = gettext('hello')
    finally:
        activate(cur_language)
    return text


def cartPage(request):
    data = cartData(request)

    cartItems = data['cartItems']
    order = data['order']
    items = data['items']

    context = {'items': items, 'order': order, 'cartItems': cartItems}
    template = 'cart.html'
    return render(request, template, context)


def checkoutPage(request):
    data = cartData(request)

    if request.method == 'POST':
        guest_email = request.POST.get('guest-email')
        print(guest_email)

    cartItems = data['cartItems']
    order = data['order']
    items = data['items']

    context = {'items': items, 'order': order, 'cartItems': cartItems}
    template = 'root/checkout.html'
    return render(request, template, context)


def emailRegister(request):
    # check if the user is already loged ..if yes redirest to homepage
    if request.user.is_authenticated:
        return redirect('main')
    # if no then login the user in

    elif request.method == "POST":
        country = request.POST.get('country')
        firstname = request.POST.get('firstname')
        lastname = request.POST.get('lastname')
        username = request.POST.get('username')
        email = request.POST.get('email')
        day = request.POST.get('day')
        month = request.POST.get('month')
        year = request.POST.get('year')
        password = request.POST.get('password')

        dateOfBirth = f'{day}/{month}/{year}'
        print(dateOfBirth)
        name = f'{firstname} {lastname}'
        user = User.objects.create_user(
            username=username,
            email=email,
            first_name=firstname,
            last_name=lastname,
            password=password
        )
        Customer.objects.create(
            user=user,
            email=email,
            name=name
        )

        template = render_to_string('mailing/email_template.html', {'name': username, 'password': password})

        email = EmailMessage(
            'EDIFICE ACCOUNT',
            template,
            settings.EMAIL_HOST_USER,
            [email],
        )

        email.fail_silently = False
        email.send()

        return redirect('login')

    context = {}
    return render(request, 'root/registerEmail.html', context)


def loginPage(request):
    # check if the user is already loged ..if yes redirest to homepage
    if request.user.is_authenticated:
        return redirect('us')
    # if no then login the user in
    else:
        form = LoginForm()
        if request.method == "POST":
            username = request.POST.get('username')
            password = request.POST.get('password1')
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect('us')
            else:
                messages.info(request, 'Username or password incorrect! ')
                return redirect('login')
        context = {'form': form}
        return render(request, 'root/login.html', context)


def logoutPage(request):
    logout(request)
    return redirect('login')


def updateItem(request):
    data = json.loads(request.body)
    productId = data['productId']
    action = data['action']
    exceed = False

    print('Action', action)
    print('ProductId', productId)

    customer = request.user.customer
    product = Product.objects.get(id=productId)
    order, created = Order.objects.get_or_create(customer=customer, complete=False)

    orderItem, created = OrderItems.objects.get_or_create(order=order, product=product)

    if action == 'add' and orderItem.quantity < 3:
        orderItem.quantity = (orderItem.quantity + 1)
    if action == 'add' and orderItem.quantity == 3:
        exceed = True
    elif action == 'remove':
        orderItem.quantity = (orderItem.quantity - 1)
    orderItem.save()

    if action == 'delete':
        orderItem.delete()
    elif orderItem.quantity <= 0:
        orderItem.delete()

    data = {'data': "Item was added! ", 'exceed': exceed}
    return JsonResponse(data=data, safe=True)


def processOrder(request):

    global orderItem
    transaction_id = datetime.datetime.now().timestamp()
    data = json.loads(request.body)

    guestEmail = data['email']
    print(guestEmail)
    address1 = data['shipping']['address1']
    print(address1)

    address2 = data['shipping']['address2']
    fn = data['shipping']['first_name']
    ln = data['shipping']['last_name']
    number = data['shipping']['number']
    country = data['shipping']['country']
    city = data['shipping']['city']
    state = data['shipping']['state']
    zipcode = data['shipping']['zipcode']

    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)

    else:
        customer, order, orderItem = guestOrder(request, data)

    total = float(data['total'])
    order.transaction_id = transaction_id

    if total == order.total_amount:
        order.complete = True
    order.save()

    ShippingAddress.objects.create(
        customer=customer,
        order=order,
        address=(address1 or address2),
        city=city,
        state=state,
        zipcode=zipcode,
        number=number,
        country=country
    )

    customerName = customer.name
    productname = orderItem.product.name
    productImage = orderItem.product.image
    amount = order.total_amount
    productQuantity = order.total_items
    template_context = {
        'name':customerName,
        'quantity': productQuantity,
        'country': country,
        'city': city,
        'number': number,
        'state': state,
        'zipcode': zipcode,
        'amount':amount,
        'address': address1,
        'orderTime': transaction_id,
    }
    template = render_to_string('mailing/shipping_template.html', template_context)
    email = EmailMessage(
        'NEW ORDER',
        template,
        settings.EMAIL_HOST_USER,
        [guestEmail],
    )

    email.fail_silently = False
    email.send()

    return JsonResponse("Payment Complete! ", safe=False)


# NORTH AMERICA

# @login_required(login_url='login')  # authenticate user before displays the homepage
def usPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/us.html'
    return render(request, template, context)


def productDetail(request, pk):
    data = cartData(request)

    cartItems = data['cartItems']
    product = Product.objects.get(id=pk)
    context = {'product': product, 'cartItems': cartItems}
    return render(request, 'root/firstproduct.html', context)


def canadaEPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/us.html'
    return render(request, template, context)


def canadaFPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/canadaF.html'
    return render(request, template, context)


# LATIN AMERICA

def mexicoPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/mexico.html'
    return render(request, template, context)


def brazilPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/brazil.html'
    return render(request, template, context)


def latinAPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/latinA.html'
    return render(request, template, context)


# MIDDLE EAST AND AFRICA


def middleEastAPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/MEA.html'
    return render(request, template, context)


def middleEastEPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/us.html'
    return render(request, template, context)


def middleEastPPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/MEP.html'
    return render(request, template, context)


# EUROPE


def englishUKPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/us.html'
    return render(request, template, context)


def englishOtherPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/us.html'
    return render(request, template, context)


def frenchPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/french.html'
    return render(request, template, context)


def germanPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/german.html'
    return render(request, template, context)


def italianPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/italian.html'
    return render(request, template, context)


def spanishPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/spanish.html'
    return render(request, template, context)


def netherlandsPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/netherlands.html'
    return render(request, template, context)


def russianPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/russian.html'
    return render(request, template, context)


def norwegianPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/norwegian.html'
    return render(request, template, context)


def czechPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/czech.html'
    return render(request, template, context)


def portuguesePage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/portuguese.html'
    return render(request, template, context)


def swedishPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/swedish.html'
    return render(request, template, context)


# ASIA


def asiaEPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/us.html'
    return render(request, template, context)


def japanPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/japan.html'
    return render(request, template, context)


def hongKongPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/hongKong.html'
    return render(request, template, context)


def chinaPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/china.html'
    return render(request, template, context)


def taiwanPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/taiwan.html'
    return render(request, template, context)


def southKoreaPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/southKorea.html'
    return render(request, template, context)


def thailandPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/thailand.html'
    return render(request, template, context)


def indonesiaPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/indonesia.html'
    return render(request, template, context)


def singaporePage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/singapore.html'
    return render(request, template, context)


# OCEANIA


def oceaniaEPage(request):
    data = cartData(request)

    cartItems = data['cartItems']

    products = Product.objects.all()
    context = {'products': products, 'cartItems': cartItems}
    template = 'casio/us.html'
    return render(request, template, context)

