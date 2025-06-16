import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { ApiResponse } from "@shared/types/api-response.type";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);

  sendContactMessage(formData: { name: string; email: string; message: string }): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${environment.backendUrl}contact`,
      formData
    );
  }
}
