require(["jira/util/formatter","wrm/context-path","jquery"],function(e,t,a){"use strict";function r(t,r,n,i){var o=a("#globalPermType_select option:selected"),l=o.val();if(a("#groupName_select option:selected").val()===t&&l===r){var s=n.filter(function(e){return a.inArray(t,e.defaultGroups)>-1});if(s.length>0){var u=o.text().trim();a("#default-group-warning-message").text(e.I18n.getText("admin.errors.permissions.grant.admin.to.default.group",t,s[0].name,u)),i.removeClass("hidden")}}}function n(){var e=a("#default-groups-warning");e.addClass("hidden");var n=a("#globalPermType_select option:selected").val(),o=a("#groupName_select option:selected").val();if(o&&("SYSTEM_ADMIN"===n||"ADMINISTER"===n)){var l=a("#addpermission_submit");l.attr("aria-disabled","true"),void 0===i&&(i=a.ajax({url:t()+"/rest/api/2/applicationrole",contentType:"application/json",type:"GET"}).promise()),i.done(function(t){r(o,n,t,e)}),i.always(function(){l.attr("aria-disabled","false")})}}var i;a(document).ready(function(){a("#groupName_select").on("change",n),a("#globalPermType_select").on("change",n)})});