import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Instruction } from '../instruction';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inst-register',
  templateUrl: './inst-register.component.html',
  styleUrls: ['./inst-register.component.css']
})

export class InstRegisterComponent implements OnInit {
  instNumber: number;
  instruction = new Instruction();
  url = 'http://localhost:3000';
  addedInst: boolean;
  instReg: FormGroup;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getInstructions();
  }// ngOnInit()

  onReset(): void {
    this.instReg.reset();
    this.addedInst = null;
  }// onReset()

  onRegister(): void {
    this.addedInst = true;
    this.doPostInstruction();
  }// onRegister

  doPostInstruction(): void {
    this.instReg['id'] = this.instNumber + 1;
    this.http.post(this.url + '/instructions', this.instruction).subscribe(
      res => console.log(res.json()),
      err => console.log(err)
    );
  }// doPostInstruction()

  getInstructions(): any {
    this.http.get(this.url + '/instructions').subscribe(
      res => this.instNumber = res.json().length,
      err => console.log(err)
    );
  }// getInstructions()
}
