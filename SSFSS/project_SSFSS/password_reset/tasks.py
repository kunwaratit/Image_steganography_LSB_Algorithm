# your_app/tasks.py

from background_task import background
from .models import PasswordResetCode


@background
def delete_reset_code(reset_code_id):
    try:
        reset_code = PasswordResetCode.objects.get(id=reset_code_id)
        reset_code.delete()
    except PasswordResetCode.DoesNotExist:
        pass
