define("jira/setup/setup-database-view",["jira/ajs/select/single-select","wrm/context-path","jquery","backbone","underscore","jira/setup/setup-abstract-view","jira/ajs/ajax/smart-ajax","jira/setup/setup-tracker"],function(e,s,t,i,n,a,o,l){return a.extend({defaults:{mssql:{port:"1433",schema:"dbo"},mysql:{port:"3306",schema:""},mysql57:{port:"3306",schema:""},oracle10g:{port:"1521",schema:""},postgres72:{port:"5432",schema:"public"}},ui:{dbMessages:".db-message",dbOption:"input[name=databaseOption]",dbSpecificFields:".db-specific-field",dbType:"#jira-setup-database-field-database-type",errorMessages:".jira-setup-global-messages .aui-message-error",externalDbFields:".external-db-field",externalDbFieldsArea:"#setup-db-external",form:"#jira-setup-database",globalMessages:".jira-setup-global-messages",port:"#jira-setup-database-field-port",schema:"#jira-setup-database-field-schema",submit:"#jira-setup-database-submit",submitSpinner:".submit-spinner",successMessages:".jira-setup-global-messages .aui-message-success",testButton:"#jira-setup-database-test-connection",testConnectionSpinner:".test-connection-spinner",testingConnection:"#jira-setup-database-field-testing-connection",migrations:"#migrations",connectingJiraToDB:"#connecting-jira-to-db"},events:{"change @ui.dbOption":"onDbOptionChangeWrapper","change @ui.dbType":"onDbTypeChange","click @ui.testButton":"onTestButtonPressed","submit @ui.form":"onSubmit","click @ui.migrations":"migrationsClicked","click @ui.connectingJiraToDB":"connectingJiraToDBClicked"},templates:{externalDbFields:JIRA.Templates.Setup.Database.externalDbFields,globalMessages:JIRA.Templates.Setup.Database.globalMessages,unableToTestConnection:JIRA.Templates.Setup.Database.unableToTestConnection},_previouslyPrevented:!1,initialize:function(){l.insert(),this.bindUIElements(),this.initAUIFields(),this.onDbOptionChange(),this.onDbTypeChange()},initAUIFields:function(){this.ui.dbType.hasClass("aui-ss-select")||new e({element:this.ui.dbType})},renderExternalDbFieldsArea:function(e){this.ui.externalDbFieldsArea.html(this.templates.externalDbFields(e)),this.bindUIElements()},onDbOptionChangeWrapper:function(){this.onDbOptionChange(),this.cleanGlobalMessages()},onDbOptionChange:function(){var e="external"!==this.ui.dbOption.filter(":checked").val();this.ui.externalDbFieldsArea.toggleClass("hidden",e),this.ui.testButton.toggleClass("hidden",e)},onDbTypeChange:function(){this.adjustExternalDbFields(!0)},adjustExternalDbFields:function(e){var e=void 0===e||e,s=function(e){return n.isArray(e)?e[0]:e}(this.ui.dbType.val());if(!s)return this.ui.dbMessages.addClass("hidden"),void this.ui.dbSpecificFields.addClass("hidden");e&&(this.ui.port.val(this.defaults[s].port),this.ui.schema.val(this.defaults[s].schema));var t=".db-type-"+s;this.ui.dbSpecificFields.addClass("hidden").filter(t).removeClass("hidden"),this.ui.dbMessages.addClass("hidden").filter(t).removeClass("hidden")},onSubmit:function(e){if(this._previouslyPrevented)return!0;e.preventDefault(),this._previouslyPrevented=!0,l.sendUserPickedDatabase(this.ui.dbOption.val()),setTimeout(n.bind(function(){this.ui.form.submit()},this),0),this.disallowFormSubmit(),this.cleanGlobalMessages(),this.ui.submitSpinner.removeClass("hidden")},disallowFormSubmit:function(){this.ui.submit.prop("disabled",!0),this.ui.testButton.prop("disabled",!0)},allowFormSubmit:function(){this.ui.submit.prop("disabled",!1),this.ui.testButton.prop("disabled",!1)},cleanGlobalMessages:function(){this.ui.globalMessages.empty()},renderGlobalMessages:function(e){this.ui.globalMessages.html(this.templates.globalMessages(e)),this.bindUIElements()},handleTestConnectionError:function(){this.ui.globalMessages.html(this.templates.unableToTestConnection()),this.bindUIElements()},onTestButtonPressed:function(e){e.preventDefault(),this.testConnection()},testConnection:function(){this.ui.testConnectionSpinner.removeClass("hidden"),this.disallowFormSubmit(),this.cleanGlobalMessages(),o.makeRequest({cache:!1,data:this.ui.form.serialize(),dataType:"json",type:"GET",url:s()+"/secure/SetupDatabase!connectionCheck.jspa",success:n.bind(function(e){if(!e||!e.data)return void this.handleTestConnectionError();this.renderExternalDbFieldsArea(e.data),this.renderGlobalMessages(e.data)},this),error:n.bind(function(){this.handleTestConnectionError()},this),complete:n.bind(function(){this.ui.testConnectionSpinner.addClass("hidden"),this.adjustExternalDbFields(!1),this.allowFormSubmit(),this.initAUIFields()},this)})},migrationsClicked:function(){l.sendUserClickedOnMigrationsLink()},connectingJiraToDBClicked:function(){l.sendUserClickedOnConnectingJiraToDatabaseLink()}})});