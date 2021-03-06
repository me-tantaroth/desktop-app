import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';

import { Message } from '../../../models/message';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  authEmail: string;
  message: Message = {
    show: false
  };

  constructor(private router: Router, private auth: AuthService) {
    chrome.storage.local.get('authenticated-email', (result) => {
      this.authEmail = result['authenticated-email'];
      if (!this.authEmail) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {}

  recovery(email: string) {
    this.auth.recoveryPassword(email).subscribe((response) => {
      if (response.status) {
        // SEND EMAIL TO RECOVERY ACCOUNT
        this.message = {
          show: true,
          label: 'Info',
          sublabel: `Se ha enviado un correo a ${email} para recuperar tu cuenta`,
          color: 'accent',
          icon: 'info'
        };
      }
    });
  }
}
