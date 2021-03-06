package com.cg.jcat.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.jcat.api.dao.AssessmentQuestionModel;
import com.cg.jcat.api.entity.AssessmentQuestion;

public interface IAssessmentQuestionRepository extends JpaRepository<AssessmentQuestion, Integer>{

	AssessmentQuestion findByQuestionTextEN(String questionDescriptionEN);

	List<AssessmentQuestion> findByIsDeleted(boolean isDeleteValue);

	AssessmentQuestion findByQuestionId(int questionId);

	List<AssessmentQuestion> findAllByIsDeletedAndAssessmentTypeForMigration(boolean isDeleted,
			boolean assessmentTypeForMigration);


	List<AssessmentQuestion> findAllByIsDeletedAndAssessmentTypeForCloudProvider(boolean isDeleted,
			boolean assessmentTypeForCloudProvider);

	List<AssessmentQuestion> findAllByIsDeletedAndAssessmentTypeForCloudable(boolean isDeleted,
			boolean assessmentTypeForCloudable);

	List<AssessmentQuestion> findAllByIsDeletedAndAssessmentTypeForCloudProviderOrAssessmentTypeForMigration(
			boolean isDeleted, boolean assessmentTypeForCloudProvider, boolean assessmentTypeForMigration);

	List<AssessmentQuestion> findAllByIsDeletedAndAssessmentTypeForCloudProviderOrAssessmentTypeForMigrationAndAssessmentTypeForCloudable(
			boolean isDeleted, boolean assessmentTypeForCloudProvider, boolean assessmentTypeForMigration, boolean b);



}
