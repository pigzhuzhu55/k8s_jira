define('jira/project/browse/projectcollectionview', ['jira/analytics', 'jira/util/formatter', 'jira/util/data/meta', 'marionette', 'jquery', 'jira/project/browse/projectview', 'jira/project/browse/projecttypesservice', 'jira/project/project-type-keys', 'jira/util/users/logged-in-user', 'jira/util/data/meta'], function (analytics, formatter, Meta, Marionette, $, ProjectView, ProjectTypesService, ProjectTypeKeys, loggedInUser, meta) {
    "use strict";

    return Marionette.CompositeView.extend({
        template: function template(data) {
            // dude is an admin
            data.isAdmin = loggedInUser.isSysadmin() || loggedInUser.isAdmin();
            // we are in administration, not global browse projects
            data.isAdminMode = meta.get('in-admin-mode');
            return JIRA.Templates.Project.Browse.projects(data);
        },
        sort: function sort(sortColumn) {
            if (this.model.get('sortOrder') === 'ascending' && this.model.get('sortColumn') === sortColumn) {
                this.model.set('sortOrder', 'descending');
            } else {
                this.model.set('sortOrder', 'ascending');
                this.model.set('sortColumn', sortColumn);
            }
            this.collection.updateSorting(sortColumn, this.model.get('sortOrder'));
            this.trigger('sorted', sortColumn, this.model.get('sortOrder'));
            this.render();
        },
        events: {
            'click th.sortable': function clickThSortable(event) {
                this.sort($(event.currentTarget).data('sort-key'));
            }
        },
        itemView: ProjectView,
        itemViewOptions: function itemViewOptions() {
            return {
                filters: this.model,
                hasArchivedProjects: !!this.model.filterByCategory("archived", this.collection.originalCollection).length
            };
        },
        itemEvents: {
            'project-view.click-project-name': function projectViewClickProjectName(event, childView, project) {
                var position = this.collection.indexOf(project);
                this.trigger('project-view.click-project-name', project, position);
            },
            'project-view.click-lead-user': function projectViewClickLeadUser(event, childView, project) {
                var position = this.collection.indexOf(project);
                this.trigger('project-view.click-lead-user', project, position);
            },
            'project-view.click-category': function projectViewClickCategory(event, childView, project) {
                var position = this.collection.indexOf(project);
                this.trigger('project-view.click-category', project, position);
            },
            'project-view.click-url': function projectViewClickUrl(event, childView, project) {
                var position = this.collection.indexOf(project);
                this.trigger('project-view.click-url', project, position);
            }
        },
        emptyView: Marionette.ItemView.extend({
            events: {
                "click .empty-state-add-project-button": "_handleAddProjectClicked"
            },
            shouldUseCallToActionTemplate: function shouldUseCallToActionTemplate() {
                var validProjectTypes = [ProjectTypeKeys.SOFTWARE, ProjectTypeKeys.SERVICE_DESK, ProjectTypeKeys.BUSINESS];
                return this.options.filters.get("projectType") && this.options.filters.get("category").id === "all" && this.options.filters.get("contains") === "" && validProjectTypes.indexOf(this.options.filters.get("projectType").key) !== -1;
            },
            getTemplate: function getTemplate() {
                if (!this.options.hasArchivedProjects && this.options.filters.get('category').id === 'archived') {
                    return JIRA.Templates.Project.Browse.archivedProjectsEmptyState;
                }

                if (this.shouldUseCallToActionTemplate()) {
                    return JIRA.Templates.Project.Browse.emptyRowWithCallToAction;
                } else {
                    return JIRA.Templates.Project.Browse.emptyRow;
                }
            },
            onRender: function onRender() {
                this.unwrapTemplate();
            },
            _handleAddProjectClicked: function _handleAddProjectClicked(e) {
                analytics.send({
                    name: "projects.browse.empty.state.add.projects.clicked",
                    properties: {
                        projectTypeKey: $(e.target).data("project-type")
                    }
                });
            },
            serializeData: function serializeData() {
                var templateParams = {};
                if (this.shouldUseCallToActionTemplate()) {
                    var projectType = this.options.filters.get("projectType").key;
                    if (projectType === ProjectTypeKeys.SOFTWARE) {
                        templateParams = {
                            headerText: formatter.I18n.getText("browse.projects.software.projects.title"),
                            descriptionText: formatter.I18n.getText("browse.projects.software.projects.description"),
                            callToActionText: formatter.I18n.getText("browse.projects.create.new.project.link"),
                            projectType: projectType
                        };
                    } else if (projectType === ProjectTypeKeys.SERVICE_DESK) {
                        templateParams = {
                            headerText: formatter.I18n.getText("browse.projects.servicedesk.projects.title"),
                            descriptionText: formatter.I18n.getText("browse.projects.servicedesk.projects.description"),
                            callToActionText: formatter.I18n.getText("browse.projects.create.new.project.link"),
                            projectType: projectType
                        };
                    } else if (projectType === ProjectTypeKeys.BUSINESS) {
                        templateParams = {
                            imageClassName: "create-business-project-image",
                            headerText: formatter.I18n.getText("browse.projects.business.projects.not.created"),
                            descriptionText: formatter.I18n.getText("browse.projects.business.projects.description"),
                            callToActionText: formatter.I18n.getText("browse.projects.create.new.project.link"),
                            projectType: projectType
                        };
                    }
                }
                return $.extend({
                    isAdmin: Meta.get("is-admin"),
                    adminMode: meta.get('in-admin-mode')
                }, templateParams);
            }
        }),
        itemViewContainer: 'tbody',
        onRender: function onRender() {
            this.unwrapTemplate();
        }
    });
});