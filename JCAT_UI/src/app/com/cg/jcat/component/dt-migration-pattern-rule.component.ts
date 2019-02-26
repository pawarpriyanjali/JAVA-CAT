import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { Subject } from 'rxjs';
import { DTMigrationRuleService } from '../service/dt-migration-rule.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { DTMigrationRule } from '../entity/DTMigrationRule';



@Component({
  selector: 'app-migration-patterns',
  templateUrl: '../view/dt-migration-pattern-rule.component.html',
  styleUrls: ['../view/dt-migration-pattern-rule.component.scss']
})
export class DTMigrationPatternComponentRule implements OnInit {

  savedMigrationQuestion:any=[];
  expand:boolean=false;
  unAnswered:any=[];
  flag2:number=0;

  clickedValue: boolean = false;
  eventValue: number;
  rule: DTMigrationRule = new DTMigrationRule();
  clickedReversedValue: boolean = false;

  migrationRuleObject: Array<DTMigrationRule> = [];
  allMigrationRules: any = [];
  dtOptions: DataTables.Settings = {};
  countOption: number = 0;
  dtTrigger: Subject<any> = new Subject();
  migrationAllData: any = [];
  migrationOption: any = [];
  migrationRule: Array<string> = [];
  originalQuestions: any = [];
  rulesQuestion: any = [];
  migrationQuestionLength: number;
  index: number = 0;
  executionOrderValue: Array<number> = [];
  value: boolean = false;
  idvalue: boolean = false;
  id: number;
  RuleId = 0;
  checked: boolean = false;
  constructor(private forMigrationPatternService: DTMigrationRuleService, public router: Router, private http: HttpClient, private myStorage: LocalStorageService) { }
  migrationIdValue: any;

  ngOnInit() {
    this.migrationIdValue = this.myStorage.getMigrationId();
    // console.log(this.migrationIdValue);
    // this.forMigrationPatternService.migrationId.subscribe(data => { this.migrationIdValue = data; });
    this.forMigrationPatternService.getMigrationQuestions().subscribe(result => {
      this.migrationAllData = result ;
      this.originalQuestions = result ;
      this.migrationQuestionLength = this.migrationAllData.length;
      this.forMigrationPatternService.getMigrationRule(this.migrationIdValue).subscribe(data => { this.allMigrationRules = data
      console.log(this.allMigrationRules);
      console.log("*******");
        for (let index1 = 0; index1 < this.allMigrationRules.length; index1++) {
        for (let index = 0; index < this.migrationAllData.length; index++) {
        
           if(this.migrationAllData[index].questionId===this.allMigrationRules[index1].questionId)
           {
             this.savedMigrationQuestion[this.savedMigrationQuestion.length]=this.migrationAllData[index];
             this.migrationAllData.splice(index,1);
           }
         }
          
        }
      
      });
      

    });
    
  }

  Cancel() {
    this.router.navigate(['/for-migration-pattern']);
  }

  addQuestions() {
    this.router.navigate(['/assessment-questions/add-assessment-question']);
  }
  setClickedRow(event: any) {
    this.originalQuestions.splice(event, 1);
  }
  onClickAddrule(event: any, event1: number) {

    this.clickedValue = true;
    this.rule = event;
    this.eventValue = event1;
  }
  hideall(){
    for (let index = 0; index < this.savedMigrationQuestion.length; index++) {
      this.expand=false;
      
    }
  }
  expandall(){
    for (let index = 0; index < this.savedMigrationQuestion.length; index++) {
      this.expand=true;
      
    }
  }

  clicked() {
    this.value = true;
    if(this.clickedValue){
    var ins = this.savedMigrationQuestion.length;
    this.savedMigrationQuestion[ins] = this.rule;
    this.originalQuestions.splice(this.eventValue, 1);

    this.unAnswered[this.unAnswered.length]=this.savedMigrationQuestion[ins].questionId;
    console.log("************"+this.unAnswered[this.unAnswered.length-1]);
  }
  this.clickedValue=false;
  }

  onClickRule(event2: any, event: any, event1: number) {
    this.idvalue = true;
    this.id = event;
    this.clickedReversedValue = true;

    console.log(event2);
    this.rule = event2;
    this.eventValue = event1;
  }

  reverceClicked() {
    if(this.clickedReversedValue)
    {
    var x = this.originalQuestions.length;
    this.originalQuestions[x] = this.rule;
    console.log(this.rule);
    this.savedMigrationQuestion.splice(this.eventValue, 1);
    console.log(this.allMigrationRules);
    for (let index = 0; index < this.allMigrationRules.length; index++) {
      if (this.allMigrationRules[index].questionId === this.rule.questionId) {
      // if (this.allMigrationRules[index].questionId === this.rule.questionId) {
        this.allMigrationRules.splice(index, 1);
      }

    }
    console.log(this.allMigrationRules);
  }
  this.clickedReversedValue=false;
  }

  selectChangeHandler(optionObject, event, qid, qtext) {
    let flag = 0;
    if (event.target.checked) {
      for (let index = 0; index < this.allMigrationRules.length; index++) {
        if (this.allMigrationRules[index].questionId == qid) {
          this.allMigrationRules[index].ruleOptionTextEN = this.allMigrationRules[index].ruleOptionTextEN + "," + optionObject.optionTextEN;
          this.allMigrationRules[index].ruleOptionIds = this.allMigrationRules[index].ruleOptionIds + "," + optionObject.optionId;
          flag++;
        }
      }
      if (flag == 0) {
        let migrationRuleNewObject: DTMigrationRule = new DTMigrationRule();
        migrationRuleNewObject.questionId = qid;
        migrationRuleNewObject.migrationId = this.migrationIdValue;
        migrationRuleNewObject.ruleOptionTextEN = optionObject.optionTextEN;
        migrationRuleNewObject.executionOrder = 0;
        migrationRuleNewObject.questiontextEN = qtext;
        migrationRuleNewObject.ruleOptionIds = String(optionObject.optionId);
        this.allMigrationRules[this.allMigrationRules.length] = migrationRuleNewObject;
      }
      for (let index = 0; index < this.unAnswered.length; index++) {
                  
        if(this.unAnswered[index]===qid)
        {
          this.unAnswered.splice(index,1);
        }
    }
    }
    else {
      for (let index = 0; index < this.allMigrationRules.length; index++) {

        if (this.allMigrationRules[index].questionId === qid) {
          this.allMigrationRules[index].ruleOptionIds = this.allMigrationRules[index].ruleOptionIds.replace(optionObject.optionId+",", '');
          this.allMigrationRules[index].ruleOptionIds = this.allMigrationRules[index].ruleOptionIds.replace(","+optionObject.optionId, '');
          this.allMigrationRules[index].ruleOptionTextEN = this.allMigrationRules[index].ruleOptionTextEN.replace(optionObject.optionTextEN+",",'');
          this.allMigrationRules[index].ruleOptionTextEN = this.allMigrationRules[index].ruleOptionTextEN.replace(","+optionObject.optionTextEN,'');
          this.allMigrationRules[index].ruleOptionIds = this.allMigrationRules[index].ruleOptionIds.replace(optionObject.optionId,'');
          this.allMigrationRules[index].ruleOptionTextEN = this.allMigrationRules[index].ruleOptionTextEN.replace(optionObject.optionTextEN,'');
          console.log("Test 1ui"+this.allMigrationRules[index].ruleOptionIds.length);
          if(this.allMigrationRules[index].ruleOptionIds.length<=0)
          {
            console.log("Test2io"+this.allMigrationRules[index].ruleOptionIds.length);
            this.flag2=1;
          }
        }
      }
      if(this.flag2===1)
              {
              this.unAnswered[this.unAnswered.length]=qid;
              console.log("$$$$"+this.unAnswered);
              this.flag2=0;
            }
    }
    console.log(this.allMigrationRules)

  }

  RuleChecked(opnObject, qid) {
    for (let index = 0; index < this.allMigrationRules.length; index++) {
      if (this.allMigrationRules[index].migrationId == this.migrationIdValue) {
        if (qid == this.allMigrationRules[index].questionId) {
          if (this.allMigrationRules[index].ruleOptionIds.includes(opnObject.optionId)) {
            return true;
          }
        }
      }
    }

  }

  saveRule() {

    if(this.unAnswered.length===0){
    this.forMigrationPatternService.saveMigrationRule(this.allMigrationRules).subscribe(
    );
    location.reload();
  }else{
    alert("Some questions are unanswered");
  }
  }

  checkValid(qid)
  {
    for (let index1 = 0; index1 < this.unAnswered.length; index1++) {
    if(this.unAnswered[index1]===qid)
      {
        return qid;
      }
  }
  }

}