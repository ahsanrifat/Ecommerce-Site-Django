from django.shortcuts import render
from store import models
from django.http import JsonResponse
import json
import datetime

# Create your views here.

def store(request):
    products=models.Product.objects.all()
    context={"products":products}
    return render(request,'store/store.html',context)

def cart(request):
    items=set()
    total_quantity=0
    total_price=0
    if request.user.is_authenticated: 
        customer=request.user
        customer=models.Customer.objects.get(user=customer)
        order,flag=models.Order.objects.get_or_create(owner=customer,is_ordered=False)
        total_price=order.get_cart_total()
        total_quantity=order.get_cart_quantity()
        items=models.OrderItem.objects.filter(relatedOrder=order).order_by('-date_added')
    else:
        try:
            cart=json.loads(request.COOKIES['cart'])
        except:
            cart={}
        
        for id in cart:
            product=models.Product.objects.get(id=id)
            items.add(product)

    print(items)
    context={"items":items,'total_quantity':total_quantity,'total_price':total_price}
    return render(request,'store/cart.html',context)


def checkout(request):
    items=None
    order=None
    if request.user.is_authenticated: 
        customer=request.user
        customer=models.Customer.objects.get(user=customer)
        order,flag=models.Order.objects.get_or_create(owner=customer,is_ordered=False)
        items=models.OrderItem.objects.filter(relatedOrder=order).order_by('-date_added')
    # else:
    context={"items":items,'order':order}
    return render(request,'store/checkout.html',context)



def updateItem(request):
    data=json.loads(request.body)
    product_id=data['product_id']
    action=data['action']
    print(product_id)
    print(action)
    if request.user.is_authenticated:
        customer=request.user.customer
        product=models.Product.objects.get(id=product_id)
        print(product)
        order,flag=models.Order.objects.get_or_create(owner=customer,is_ordered=False)
        
        orderitem_queryset=models.OrderItem.objects.filter(relatedOrder=order)
        print(len(orderitem_queryset))
        if len(orderitem_queryset)!=0:
            orderitem=None
            print("hfjdshfjk")
            for each_item in orderitem_queryset:
                print(each_item.product)
                if each_item.product==product:
                    orderitem=each_item
                    print("old")
                    break
            if orderitem==None:
                print("new")
                orderitem=models.OrderItem(product=product,relatedOrder=order)
                orderitem.save()
                
        elif len(orderitem_queryset)==0:
            orderitem=models.OrderItem(product=product,relatedOrder=order)
            orderitem.save()
            print("new first")
            print(orderitem)
            
        if orderitem!=None:    
        
            if orderitem.quantity<=0 or action=='delete' or action=='remove':
                orderitem.delete()
            if action=='add':
                orderitem.quantity=orderitem.quantity+1
                orderitem.save()
                order.save()
            elif action=='remove':
                orderitem.quantity=orderitem.quantity-1
                orderitem.save()
                order.save()
                if orderitem.quantity==0:
                    orderitem.delete()
        
    quan=str(order.get_cart_quantity())  
    return JsonResponse(quan,safe=False)


def get_cart_item(request):
    quan=0
    if request.user.is_authenticated:
        customer=request.user.customer
        order=models.Order.objects.filter(owner=customer,is_ordered=False)
        quan=0
        for o in order:
            quan=str(o.get_cart_quantity())
            break
        
    return JsonResponse(str(quan),safe=False)
    


def register_user(request):
    return render(request,'store/register.html')

def background(request):
    return False