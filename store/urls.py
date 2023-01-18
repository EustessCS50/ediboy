from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('', views.mainPage, name='main'),
    path('cart/', views.cartPage, name='cart'),
    path('checkout/', views.checkoutPage, name='checkout'),
    path('sign_up/', views.emailRegister, name='register'),
    path('sign_up/email', views.emailRegister, name='email-sign'),
    path('login/', views.loginPage, name='login'),
    path('logout/', views.logoutPage, name='logout'),
    path('product/<str:pk>/detail', views.productDetail, name='product-detail'),
    path('update_item', views.updateItem, name='update_item'),
    path('process', views.processOrder, name='process_order'),
]

urlpatterns += [
    path('reset_password/',
         auth_views.PasswordResetView.as_view(template_name="doorb1/password_reset.html"),
         name="reset_password"),
    path('reset_password_sent/',
         auth_views.PasswordResetDoneView.as_view(template_name="doorb1/password_reset_sent.html"),
         name='password_reset_done'),
    path('reset<uidb64><token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name="doorb1/password_reset_form.html"),
         name='password_reset_confirm'),
    path('reset_password-complete/',
         auth_views.PasswordResetCompleteView.as_view(template_name="doorb1/password_reset_done.html"),
         name='password_reset_complete'),
]

# URL path for Social Auth

urlpatterns += [
    path('oauth/', include('social_django.urls')),
]

# URL paths for the different countries

urlpatterns += [
    path('us/', views.usPage, name='us'),
    path('trans/', views.lang, name='trans'),
    path('canada_english/', views.canadaEPage, name='canadaE'),
    path('canada_french/', views.canadaFPage, name='canadaF'),
    path('mexico/', views.mexicoPage, name='mexico'),
    path('brazil/', views.brazilPage, name='brazil'),
    path('latin_america/', views.latinAPage, name='latinA'),
    path('middle_east_arabic/', views.middleEastAPage, name='MEA'),
    path('middle_east_english/', views.middleEastEPage, name='MEE'),
    path('middle_east_persian/', views.middleEastPPage, name='MEP'),
    path('english_uk/', views.englishUKPage, name='englishUK'),
    path('english_other/', views.englishOtherPage, name='englishO'),
    path('francais/', views.frenchPage, name='french'),
    path('deutsch/', views.germanPage, name='german'),
    path('italiano/', views.italianPage, name='italian'),
    path('espanol/', views.spanishPage, name='spanish'),
    path('nederland/', views.netherlandsPage, name='netherlands'),
    path('russian/', views.russianPage, name='russian'),
    path('norsk/', views.norwegianPage, name='norwegian'),
    path('czech/', views.czechPage, name='czech'),
    path('portuguese/', views.portuguesePage, name='portuguese'),
    path('svenska/', views.swedishPage, name='swedish'),
    path('asia_english/', views.asiaEPage, name='asiaE'),
    path('japan/', views.japanPage, name='japan'),
    path('hong_kong/', views.hongKongPage, name='hongKong'),
    path('china/', views.chinaPage, name='china'),
    path('taiwan/', views.taiwanPage, name='taiwan'),
    path('south_korea/', views.southKoreaPage, name='southKorea'),
    path('thailand/', views.thailandPage, name='thailand'),
    path('indonesia/', views.indonesiaPage, name='indonesia'),
    path('singapore/', views.singaporePage, name='singapore'),
    path('oceania_english/', views.oceaniaEPage, name='oceaniaE'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
