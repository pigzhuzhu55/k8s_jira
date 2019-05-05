define("jira/dialog/init-non-dashboard-dialogs",["jira/dialog/dialog-register","jira/dialog/dialog-util","jira/dialog/form-dialog","jira/dialog/labels-dialog","jira/dialog/link-issue-dialog-factory","jira/dialog/screenshot-window","jira/issuenavigator/issue-navigator","jquery","exports"],function(e,s,i,t,a,u,o,l,n){"use strict";n.init=function(){function n(e){var s=e.$activeTrigger,i=s.closest(".labels-wrap");return 0!==s.parents("#view-subtasks").length?i=s.parents("tr").find(".labels-wrap"):s.hasClass("issueaction-edit-labels")&&(i=l(o.isNavigator()?"#issuetable tr.issuerow.focused td.labels .labels-wrap":"#wrap-labels .labels-wrap")),i.length>0&&i}if(document.getElementById("dashboard"))return!1;e.linkIssue=a.createLinkIssueDialog(".issueaction-link-issue"),e.deleteIssue=new i({id:"delete-issue-dialog",trigger:".issueaction-delete-issue",targetUrl:"#delete-issue-return-url",ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,issueMsg:"thanks_issue_deleted",delayShowUntil:s.BeforeShowIssueDialogHandler.execute,isIssueDialog:!0}),e.archiveIssue=new i({id:"archive-issue-dialog",trigger:".issueaction-archive-issue",targetUrl:"#archive-issue-return-url",ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,issueMsg:"thanks_issue_archived",delayShowUntil:s.BeforeShowIssueDialogHandler.execute,isIssueDialog:!0}),e.restoreIssue=new i({id:"restore-issue-dialog",trigger:".issueaction-restore-issue",targetUrl:"#restore-issue-return-url",ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,issueMsg:"thanks_issue_restored",delayShowUntil:s.BeforeShowIssueDialogHandler.execute,isIssueDialog:!0}),e.cloneIssue=new i({id:"clone-issue-dialog",trigger:".issueaction-clone-issue",handleRedirect:!0,ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,issueMsg:"thanks_issue_cloned",delayShowUntil:s.BeforeShowIssueDialogHandler.execute,isIssueDialog:!0}),e.assignIssue=new i({id:"assign-dialog",trigger:".issueaction-assign-issue",ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,issueMsg:"thanks_issue_assigned",delayShowUntil:s.BeforeShowIssueDialogHandler.execute,isIssueDialog:!0,widthClass:"large"}),e.assignIssueToMe=new i({id:"assign-dialog",trigger:".issueaction-assign-to-me",ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,issueMsg:"thanks_issue_assigned",delayShowUntil:s.BeforeShowIssueDialogHandler.execute,isIssueDialog:!0}),e.logWork=new i({id:"log-work-dialog",trigger:".issueaction-log-work",handleRedirect:!0,ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,issueMsg:"thanks_issue_worklogged",delayShowUntil:s.BeforeShowIssueDialogHandler.execute,isIssueDialog:!0,widthClass:"large"}),e.attachFile=new i({id:"attach-file-dialog",trigger:".issueaction-attach-file",handleRedirect:!0,ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,issueMsg:"thanks_issue_attached",isIssueDialog:!0,widthClass:"large"}),e.attachScreenshot=new u({id:"attach-screenshot-window",trigger:".issueaction-attach-screenshot"}),e.manageAttachment=new i({id:"manage-attachment-dialog",trigger:"#manage-attachment-link",stacked:!0,reloadOnPop:!0,isIssueDialog:!0,widthClass:"large"}),e.comment=new i({id:"comment-add-dialog",trigger:".issueaction-comment-issue:not(.inline-comment)",handleRedirect:!0,ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,issueMsg:"thanks_issue_commented",isIssueDialog:!0,widthClass:"large"}).dirtyFormWarning(),e.editLabels=new t({id:"edit-labels-dialog",trigger:".issueaction-edit-labels,aui-item-link.edit-labels",autoClose:!0,ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,issueMsg:"thanks_issue_labelled",delayShowUntil:s.BeforeShowIssueDialogHandler.execute,labelsProvider:n,isIssueDialog:!0}),e.editComment=new i({type:"ajax",id:"edit-comment",trigger:".action-links .edit-comment",delayShowUntil:s.BeforeShowIssueDialogHandler.execute,isIssueDialog:!0,widthClass:"large"}).dirtyFormWarning(),e.editLogWork=new i({id:"edit-log-work-dialog",trigger:".action-links .edit-worklog-trigger",isIssueDialog:!0,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,delayShowUntil:s.BeforeShowIssueDialogHandler.execute,widthClass:"large"}),e.deleteLogWork=new i({id:"delete-log-work-dialog",trigger:".action-links .delete-worklog-trigger",isIssueDialog:!0,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,delayShowUntil:s.BeforeShowIssueDialogHandler.execute,widthClass:"large"}),e.deleteComment=new i({type:"ajax",id:"delete-comment-dialog",trigger:".action-links [id^='delete_comment']",delayShowUntil:s.BeforeShowIssueDialogHandler.execute,isIssueDialog:!0,widthClass:"large"}).dirtyFormWarning(),e.watchIssue=new i({ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,delayShowUntil:s.BeforeShowIssueDialogHandler.execute,trigger:".issueaction-watch-issue:not([id='toggle-watch-issue'])",isIssueDialog:!0}),e.stopWatchingIssue=new i({ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,delayShowUntil:s.BeforeShowIssueDialogHandler.execute,trigger:".issueaction-unwatch-issue:not([id='toggle-watch-issue'])",isIssueDialog:!0}),e.addVoteForIssue=new i({ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,delayShowUntil:s.BeforeShowIssueDialogHandler.execute,trigger:".issueaction-vote-issue:not([id='toggle-vote-issue'])",isIssueDialog:!0}),e.removeVoteForIssue=new i({ajaxOptions:s.getDefaultAjaxOptions,onSuccessfulSubmit:s.storeCurrentIssueIdOnSucessfulSubmit,delayShowUntil:s.BeforeShowIssueDialogHandler.execute,trigger:".issueaction-unvote-issue:not([id='toggle-vote-issue'])",isIssueDialog:!0}),new i({type:"ajax",id:"delete-attachment-dialog",trigger:"#attachmentmodule .attachment-delete a, #issue-attachments-table a.delete",isIssueDialog:!0})}});