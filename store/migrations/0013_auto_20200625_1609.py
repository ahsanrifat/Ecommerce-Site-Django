# Generated by Django 3.0.7 on 2020-06-25 10:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0012_auto_20200625_1534'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='relatedOrder',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='store.Order'),
        ),
    ]