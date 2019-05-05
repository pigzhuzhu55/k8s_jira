define("jira/dialog/link-issue-dialog-factory",["require"],function(e){"use strict";function i(e,i){var n=!1;return h.each(i,function(i,t){if(t.id===e)return t.isSelected=!0,n=!0,!1}),n||(i[0].isSelected=!0),i}function n(e){var i=new j;return f.makeRequest({url:I+"/rest/viewIssue/1/remoteIssueLink/linkType?issueId="+e,complete:function(e,n,t){t.successful?i.resolve(t.data):i.reject(f.buildDialogErrorContent(t))}}),i.promise()}function t(e){var i=new j,n=g.getDefaultAjaxOptions.call(e);return n.complete=function(e,n,t){t.successful?i.resolve(t.data):i.reject(f.buildDialogErrorContent(t))},f.makeRequest(n),i.promise()}function r(e){return e.$activeTrigger.attr("id")}function o(){return"link.issue.dialog"}function s(){return w("wrc!"+o())}function a(){h.when(w("wr!com.atlassian.jira.plugin.system.issueoperations:link-issue-error-dialog")).done(function(){var e=AJS.dialog2(h(JIRA.Templates.LinkIssue.errorDialog())).on("show",function(){v.send({name:"link.issue.dialog.loading.ui.resources.failed"})});e.$el.find("#error-dialog-button").click(function(){b.reloadViaWindowLocation()}),e.show()}).fail(function(e){C.error(e)})}function u(e){return new d({id:"link-issue-dialog",isIssueDialog:!0,trigger:e,onSuccessfulSubmit:function(e,i){"warning"!==i.getResponseHeader("X-Atlassian-Dialog-Msg-Type")&&g.storeCurrentIssueIdOnSucessfulSubmit.apply(this,arguments)},issueMsg:"thanks_issue_linked",widthClass:"large",stacked:!0,content:function(e,o){var u=this,l=p.getIssueId()||m.getSelectedIssueId(),c=s();h.when(c).done(function(){var o=n(l),s=t(u);h.when(s,o).done(function(n,t){t=i(r(u),t),e(JIRA.Templates.LinkIssue.dialog({linkTypes:t,tabContent:n})),h.each(t,function(e,i){var n;!0===i.isSelected&&(n="[name='"+i.focusedFieldName+"']",0===h(n).length&&(n="#"+i.id),u._focusFirstField(n))})}).fail(function(i,n){e(n||i)})}).fail(function(){o(),a()})},formatSubmitResponseContent:function(e){return this.get$popupContent().find(".dialog-pane").html(e),this.get$popupContent().html()},onContentRefresh:function(){this.bindAnchorsToDialog(this.get$popupContent().find(".dialog-menu-item "))}})}var l=e("jira/deprecator"),c=e("jira/dialog/dialog-factory"),d=e("jira/dialog/form-dialog"),g=e("jira/dialog/dialog-util"),f=e("jira/ajs/ajax/smart-ajax"),p=e("jira/issue"),m=e("jira/issuenavigator/issue-navigator"),h=e("jquery"),j=e("jira/jquery/deferred"),k=e("wrm/context-path"),w=e("wrm/require"),I=k(),v=e("jira/analytics"),C=e("jira/util/logger"),b=e("jira/util/browser");return c.createLinkIssueDialog=u,l.prop(c,"createLinkIssueDialog",{sinceVersion:"7.3",removeInVersion:"8.0"}),{createLinkIssueDialog:u,webResourcesContextName:o}});