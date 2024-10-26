import { Component, inject, input, output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../_services/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountsService)
  private toastr = inject(ToastrService)
  private router = inject(Router);
  cancelRegister = output<boolean>();
  model: any = {}

  register(){
    this.accountService.register(this.model).subscribe({
      next: response =>{
        console.log(response);
        this.toastr.success('Welcome to DatingApp'+' '+response.username);
        this.router.navigateByUrl('/members')
        this.cancel();
      },
      error:error => this.toastr.error(error.error)
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
