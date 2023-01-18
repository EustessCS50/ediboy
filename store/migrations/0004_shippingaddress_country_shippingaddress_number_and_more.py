# Generated by Django 4.1.4 on 2023-01-11 22:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_remove_customer_email_remove_customer_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='shippingaddress',
            name='country',
            field=models.CharField(default='United States', max_length=20),
        ),
        migrations.AddField(
            model_name='shippingaddress',
            name='number',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='dateofbirth',
            field=models.CharField(blank=True, max_length=10, null=True, verbose_name='date of birth'),
        ),
    ]
