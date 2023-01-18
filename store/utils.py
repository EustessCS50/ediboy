import json
import datetime

from .models import *


def cookieCart(request):
    try:
        cart = json.loads(request.COOKIES['cart'])
    except:
        cart = {}

    print("Cart: ", cart)
    items = []
    order = {'total_amount': 0, 'total_items': 0, 'shipping': False}
    cartItems = order['total_items']
    for i in cart:
        try:
            cartItems += cart[i]['quantity']
            product = Product.objects.get(id=i)
            total = (product.price * cart[i]['quantity'])
            order['total_amount'] += total
            order['total_items'] += cart[i]['quantity']

            item = {
                'product': {
                    'id': product.id,
                    'name': product.name,
                    'price': product.price,
                    'imageURL': product.imageURL
                },
                'quantity': cart[i]['quantity'],
                'amount': total
            }
            items.append(item)
        except:
            pass

    return {'items': items, 'order': order, 'cartItems': cartItems}


def cartData(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitems_set.all()
        cartItems = order.total_items
    else:
        cookieData = cookieCart(request)
        cartItems = cookieData['cartItems']
        order = cookieData['order']
        items = cookieData['items']
    return {'items': items, 'order': order, 'cartItems': cartItems}


def guestOrder(request, data):
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

    print('User is not logged in..')
    print("COOKIES: ", request.COOKIES)

    email = str(guestEmail)
    username = email[:email.index('@')]
    print(username)

    cookieData = cookieCart(request)
    items = cookieData['items']

    customer, created = Customer.objects.get_or_create(
        email=email,
    )

    customer.name = f"{fn} {ln}"
    customer.save()

    order = Order.objects.create(
        customer=customer,
        complete=False,
    )
    orderItem = None
    for item in items:
        product = Product.objects.get(id=item['product']['id'])
        orderItem = OrderItems.objects.create(
            product=product,
            order=order,
            quantity=item['quantity']
        )

    return customer, order, orderItem
