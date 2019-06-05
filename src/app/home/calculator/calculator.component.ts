import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  num1;
  num2;
  sum;
  difference;
  divide;
  mult;

  constructor() { }

  ngOnInit() {
  }
  add(a,b)
  {
    if(a > b)
    {
    this.sum = Number(a)+Number(b);
    }
    else
    {
      alert('a should be greater than b');
    }
  }
  subtract(a,b)
  {
    this.difference = Number(a) - Number(b);
  }
  division(a,b)
  {
    this.divide = Number(a)/Number(b);
  }
  multiply(a,b)
  {
    this.mult=Number(a)* Number(b);
  }

}
