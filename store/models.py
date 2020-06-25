from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.

class Customer(models.Model):
    user=models.OneToOneField(User,null=True,blank=True,on_delete=models.CASCADE)
    name=models.CharField(max_length=200,null=True)
    email=models.CharField(max_length=200)
    
    def __str__(self):
        return self.name
    
class Product(models.Model):
    name=models.CharField(max_length=200)
    price=models.FloatField()
    image=models.ImageField(null=True,blank=True)
    digital=models.BooleanField(default=False,null=True,blank=False)
    
    def __str__(self):
        return self.name
    
    @property
    def imgURL(self):
        try:
            s=self.image.url
        except:
            s=''
        return s
    
    
    
class Order(models.Model):
    is_ordered=models.BooleanField(default=False)
    owner=models.ForeignKey(Customer,on_delete=models.CASCADE,null=True)
    date_added=date_added=models.DateTimeField(auto_now=True)
    
    def get_cart_quantity(self):
        total_quan=0
        for item in OrderItem.objects.filter(relatedOrder=self):
            total_quan +=item.quantity
        
        return total_quan
    
    
    def get_cart_total(self):
        total_price=0
        for item in OrderItem.objects.filter(relatedOrder=self):
            total_price +=item.product.price*item.quantity
        
        return total_price
    def __str__(self):
        return '{}'.format(self.id)

    
class OrderItem(models.Model):
    product=models.OneToOneField(Product,on_delete=models.SET_NULL,null=True)
    relatedOrder=models.ForeignKey(Order,on_delete=models.CASCADE,null=True,blank=False)
    is_ordered=models.BooleanField(default=False)
    quantity=models.IntegerField(default=0)
    date_added=models.DateTimeField(default=datetime.datetime.now)
    date_ordered=models.DateTimeField(null=True)
    def __str__(self):
        return self.product.name
    def item_price(self):
        return self.product.price*self.quantity
    

    
class ShippingAddress(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.SET_NULL,blank=True,null=True)
    order=models.ForeignKey(Order,on_delete=models.SET_NULL,blank=True,null=True)
    address=models.CharField(max_length=200,null=True)
    city=models.CharField(max_length=200,null=True)
    area=models.CharField(max_length=200,null=True)
    zipcode=models.CharField(max_length=200,null=True)
    date_added=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.address
    
    
    
