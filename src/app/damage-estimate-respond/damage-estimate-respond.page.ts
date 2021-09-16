import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import sliderAll from '../../assets/SliderAll.json';
import messageList from '../../assets/messageList.json';

@Component({
  selector: 'app-damage-estimate-respond',
  templateUrl: './damage-estimate-respond.page.html',
  styleUrls: ['./damage-estimate-respond.page.scss'],
})
export class DamageEstimateRespondPage implements OnInit {
  imgURLs=sliderAll;
  messages=messageList;
  public collitionForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) {
    this.collitionForm = this.formBuilder.group({
      description:['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]{9,}'), Validators.minLength(10)]],
    }); 
  }
validation_messages = {
  'description': [
    { type: 'required', message: '* Description required!' },
    { type: 'pattern', message: '* Description too short!' }
  ]
};

  ngOnInit() {
  }

  submitDetails(){
    this.router.navigateByUrl('/damage-estimate');
  }

}
