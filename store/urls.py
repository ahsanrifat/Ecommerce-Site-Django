from django.urls import path
# from views import store,cart,checkout
from store import views

urlpatterns = [
    path('', views.store,name='store'),
    path('cart/', views.cart,name='cart'),
    path('checkout/',views.checkout,name='checkout'),
    path('update_item/',views.updateItem,name="up"),
    path('get_cart_item/',views.get_cart_item,name="cartitem"),
    path('register_user/',views.register_user,name="register"),
    path('login_user/',views.login_user,name="login"),
    path('background_op/',views.background,name="background"),
    path('register_user_db/',views.register_user_db,name="register_user_db"),
]
