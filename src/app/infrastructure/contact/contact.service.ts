import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@environments/environment";

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);

  sendContactMessage(formData: { name: string; email: string; message: string }) {
    return this.http.post<{ message: string }>(
      `${environment.backendUrl}contact`,
      formData
    );
  }
}
