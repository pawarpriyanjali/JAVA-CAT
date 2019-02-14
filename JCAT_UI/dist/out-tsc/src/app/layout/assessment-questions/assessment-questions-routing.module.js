"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var assessment_questions_component_1 = require("./assessment-questions.component");
var import_question_component_1 = require("./import-question/import-question.component");
var add_assessment_question_component_1 = require("./add-assessment-question/add-assessment-question.component");
var update_question_component_1 = require("./update-question/update-question.component");
var routes = [
    {
        path: '',
        component: assessment_questions_component_1.AssessmentQuestionsComponent
    },
    { path: 'import-question', component: import_question_component_1.ImportQuestionComponent },
    { path: 'add-assessment-question', component: add_assessment_question_component_1.AddAssessmentQuestionComponent },
    { path: 'update-question', component: update_question_component_1.UpdateQuestionComponent }
];
var AssessmentQuestionsRoutingModule = /** @class */ (function () {
    function AssessmentQuestionsRoutingModule() {
    }
    AssessmentQuestionsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AssessmentQuestionsRoutingModule);
    return AssessmentQuestionsRoutingModule;
}());
exports.AssessmentQuestionsRoutingModule = AssessmentQuestionsRoutingModule;
//# sourceMappingURL=assessment-questions-routing.module.js.map