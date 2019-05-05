<%@ taglib uri="webwork" prefix="ww" %>
<%@ taglib uri="webwork" prefix="ui" %>
<%@ taglib uri="sitemesh-page" prefix="page" %>
<html>
<head>
	<title><ww:text name="'admin.issuefields.fieldconfigschemes.edit.field.configuration.scheme'"/></title>
    <meta name="admin.active.section" content="admin_issues_menu/element_options_section/fields_section"/>
    <meta name="admin.active.tab" content="issue_fields"/>
</head>
<body>

<page:applyDecorator name="jiraform">
    <page:param name="action">EditFieldLayoutScheme.jspa</page:param>
    <page:param name="cancelURI"><ww:url page="ViewFieldLayoutSchemes.jspa" /></page:param>
    <page:param name="submitId">update_submit</page:param>
    <page:param name="submitName"><ww:text name="'common.forms.update'"/></page:param>
    <page:param name="title"><ww:text name="'admin.issuefields.fieldconfigschemes.edit.field.configuration.scheme'"/></page:param>
    <page:param name="width">100%</page:param>
    <page:param name="description">
        <ww:text name="'admin.issuefields.fieldconfigschemes.on.this.page.you.can.change'">
            <ww:param name="'value0'"><b><ww:property value="/fieldLayoutScheme/name" /></b></ww:param>
        </ww:text>
    </page:param>

    <ui:textfield label="text('common.words.name')" name="'fieldLayoutSchemeName'" size="'30'">
        <ui:param name="'mandatory'">true</ui:param>
    </ui:textfield>

    <ui:textfield label="text('common.words.description')" name="'fieldLayoutSchemeDescription'" size="'60'" />

    <ui:component name="'id'" template="hidden.jsp" theme="'single'" />
</page:applyDecorator>

</body>
</html>
