import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "payment-form",
  templateUrl: "./payment-form.component.html",
  styleUrls: ["./payment-form.component.css"]
})
export class PaymentFormComponent {
  imageSrc = "assets/img/visa.png";
  form;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      cardName: ["", [Validators.required, Validators.pattern(/[a-zA-Z\s]/)]],
      cardNumber: ["", Validators.required],
      cardExpires: [
        "",
        [Validators.required, Validators.pattern(/^(0\d|1[0-2])\s\/\s\d{2}$/)]
      ],
      cardCvv: ["", [Validators.required, Validators.pattern(/[\d{3}]/)]]
    });
  }
  get cardNumber() {
    return this.form.get("cardNumber") as FormControl;
  }
  get cardExpires() {
    return this.form.get("cardExpires") as FormControl;
  }
  get cardCvv() {
    return this.form.get("cardCvv") as FormControl;
  }
  onSubmit() {
    console.log(this.form.value);
  }
  cardCheck(cardNumber) {
    // photo changes depend on card number
    let pattern = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/;
    if (cardNumber.length > 3 && cardNumber.match(pattern)) {
      this.imageSrc = "assets/img/mastercard.png";
    } else this.imageSrc = "assets/img/visa.png";
    // adds hyphens
    let newValue = cardNumber.replace(/[^\d]/g, "").replace(/(.{4})/g, "$1-");
    if (cardNumber.length == 19) {
      newValue = cardNumber.replace(/$-/g, "");
    }
    this.cardNumber.patchValue(newValue);
  }
  cardExp(cardExpires) {
    let newValue = cardExpires.replace(/[^\d]/g, "").replace(/(.{2})/, "$1 / ");
    this.cardExpires.patchValue(newValue);
  }
  cvvCheck(cardCvv) {
    let newValue = cardCvv.replace(/[^\d]/g, "");
    this.cardCvv.patchValue(newValue);
  }
}
