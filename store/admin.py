from django.contrib import admin
from .models import *

# Register your models here.
#
# admin.site.register(Continent)
# admin.site.register(Country)

admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItems)
admin.site.register(ShippingAddress)
