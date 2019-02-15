import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AssessmentQuestions } from '../entity/AssessmentQuestion';
import { AssessmentService } from '../service/assessment.service';
import { DTMigrationRuleService } from '../service/dt-migration-rule.service';

@Component({
  selector: 'app-for-migration-pattern',
  templateUrl: '../view/dt-migration-pattern.component.html',
  styleUrls: ['../view/dt-migration-pattern.component.scss']
})
export class DTMigrationPatternComponent implements OnInit {
  assessmentQuestions: AssessmentQuestions = new AssessmentQuestions();
  dtOptions: DataTables.Settings = {};
  dtTrigger:  Subject<any>  =  new  Subject();
  migrationPatternData :  any  =  [];
  constructor(private forMigrationPatternService: DTMigrationRuleService, public router: Router, private http: HttpClient) { }

  ngOnInit() {

    this.dtOptions  =  {
      pagingType:  'full_numbers',
      pageLength:  10,
      responsive:  true
    };
    this.forMigrationPatternService.getMigration().subscribe(result  => {
      this.migrationPatternData  =  result ;
      this.dtTrigger.next();

    });
  }

  questions(migrationId: number) {
    this.forMigrationPatternService.sendMsgtoOtherComponent(migrationId);
    this.forMigrationPatternService.getMigrationQuestions().subscribe(
      result => {
        this.router.navigate(['/dt-migration-pattern/dt-migration-pattern-rule']);
      }
    );
  }

}
