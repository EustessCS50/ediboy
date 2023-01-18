from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = {_('username'), _('email'), _('password1'), _('password2')}

class LoginForm(UserCreationForm):
    class Meta:
        model = User
        fields = {_('username'), _('password1')}