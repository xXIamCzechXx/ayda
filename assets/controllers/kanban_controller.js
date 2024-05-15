import { Controller } from '@hotwired/stimulus';

/*
 * Charts Controller
 * Visualization of charts printed on pages
 */
export default class extends Controller {

    /**
     * jkanban init
     */
    connect() {
        (function() {
            if (document.getElementById("myKanban")) {
                let KanbanTest = new jKanban({
                    element: "#myKanban",
                    gutter: "10px",
                    widthBoard: "450px",
                    click: el => {
                        let jkanbanInfoModal = document.getElementById("jkanban-info-modal");

                        let jkanbanInfoModalTaskId = document.querySelector(
                            "#jkanban-info-modal #jkanban-task-id"
                        );
                        let jkanbanInfoModalTaskTitle = document.querySelector(
                            "#jkanban-info-modal #jkanban-task-title"
                        );
                        let jkanbanInfoModalTaskAssignee = document.querySelector(
                            "#jkanban-info-modal #jkanban-task-assignee"
                        );
                        let jkanbanInfoModalTaskDescription = document.querySelector(
                            "#jkanban-info-modal #jkanban-task-description"
                        );
                        let taskId = el.getAttribute("data-eid");

                        let taskTitle = el.querySelector('p.text').innerHTML;
                        let taskAssignee = el.getAttribute("data-assignee");
                        let taskDescription = el.getAttribute("data-description");
                        jkanbanInfoModalTaskId.value = taskId;
                        jkanbanInfoModalTaskTitle.value = taskTitle;
                        jkanbanInfoModalTaskAssignee.value = taskAssignee;
                        jkanbanInfoModalTaskDescription.value = taskDescription;
                        let myModal = new bootstrap.Modal(jkanbanInfoModal, {
                            show: true
                        });
                        myModal.show();
                    },
                    buttonClick: function(el, boardId) {
                        if (
                            document.querySelector("[data-id='" + boardId + "'] .itemform") ===
                            null
                        ) {
                            // create a form to enter element
                            let formItem = document.createElement("form");
                            formItem.setAttribute("class", "itemform");
                            formItem.innerHTML = `<div class="input-group">
                                  <textarea class="form-control" rows="2" autofocus></textarea>
                                  </div>
                                  <div class="form-group">
                                    <button type="submit" class="btn bg-gradient-success btn-sm pull-end">Add</button>
                                    <button type="button" id="kanban-cancel-item" class="btn bg-gradient-light btn-sm pull-end me-2">Cancel</button>
                                  </div>`;

                            KanbanTest.addForm(boardId, formItem);
                            formItem.addEventListener("submit", function(e) {
                                e.preventDefault();
                                let text = e.target[0].value;
                                let newTaskId =
                                    "_" + text.toLowerCase().replace(/ /g, "_") + boardId;
                                KanbanTest.addElement(boardId, {
                                    id: newTaskId,
                                    title: text,
                                    class: ["border-radius-xl"]
                                });
                                formItem.parentNode.removeChild(formItem);
                            });
                            document.getElementById("kanban-cancel-item").onclick = function() {
                                formItem.parentNode.removeChild(formItem);
                            };
                        }
                    },
                    addItemButton: true,
                    boards: [
                        {
                            id: "_backlog",
                            title: "Backlog",
                            item: [
                                {
                                    id: "_task_1_title_id",
                                    title: '<p class="text mb-0">Click me to change title</p>',
                                    class: ["border-radius-md"]
                                },
                                {
                                    id: "_task_2_title_id",
                                    title: '<p class="text mb-0">Drag me to "In progress" section</p>',
                                    class: ["border-radius-md"]
                                },
                                {
                                    id: "_task_do_something_id",
                                    title: '<img src="/build/images/material-dashboard/img/office-dark.jpg" class="w-100"><span class="mt-3 badge badge-sm bg-gradient-primary">Pending</span><p class="text mt-2">Website Design: New cards for blog section and profile details</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">3</span></div><div class="avatar-group ms-auto"><a href="javascript:" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-1.jpg" class=""></a><a href="javascript:;" class="avatar avatar-xs rounded-circle me-2" data-toggle="tooltip" data-original-title="Audrey Love"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-2.jpg" class="rounded-circle"></a><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Michael Lewis"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-3.jpg" class="rounded-circle"></a></div></div>',
                                    assignee: "Done Joe",
                                    description: "This task's description is for something, but not for anything",
                                    class: ["border-radius-xl"]
                                },
                            ]
                        },
                        {
                            id: "_progress",
                            title: "In progress",
                            item: [{
                                id: "_task_3_title_id",
                                title: '<span class="mt-2 badge badge-sm bg-gradient-warning">Errors</span><p class="text mt-2">Fix Firefox errors</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">11</span></div><div class="avatar-group ms-auto"><a href="javascript:" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jana Lucie"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-3.jpg" class=""></a><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-2.jpg" class=""></a></div></div>',
                                class: ["border-radius-md"]
                            },
                                {
                                    id: "_task_4_title_id",
                                    title: '<span class="badge badge-sm bg-gradient-info">Updates</span><p class="text mt-2">Argon Dashboard PRO - Angular 11</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">3</span></div><div class="avatar-group ms-auto"><a href="javascript" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jana Lucie"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-5.jpg" class=""></a><a href="javascript" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-4.jpg" class=""></a></div></div>',
                                    class: ["border-radius-xl"]
                                },
                                {
                                    id: "_task_do_something_4_id",
                                    title: '<img src="/build/images/material-dashboard/img/meeting.jpg" class="w-100"><span class="mt-3 badge badge-sm bg-gradient-info">Updates</span><p class="text mt-2">Vue 3 Updates</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">9</span></div><div class="avatar-group ms-auto"><a href="javascript" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-1.jpg" class=""></a><a href="javascript" class="avatar avatar-xs rounded-circle me-2" data-toggle="tooltip" data-original-title="Audrey Love"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-2.jpg" class="rounded-circle"></a><a href="javascript" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Michael Lewis"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-4.jpg" class="rounded-circle"></a></div></div>',
                                    assignee: "Done Joe",
                                    description: "This task's description is for something, but not for anything",
                                    class: ["border-radius-xl"]
                                }
                            ]

                        },
                        {
                            id: "_finallog",
                            title: "Finallog",
                            item: [
                                {
                                    id: "_task_1_title_id",
                                    title: '<p class="text mb-0">Click me to change title</p>',
                                    class: ["border-radius-md"]
                                },
                                {
                                    id: "_task_2_title_id",
                                    title: '<p class="text mb-0">Drag me to "In progress" section</p>',
                                    class: ["border-radius-md"]
                                },
                                {
                                    id: "_task_do_something_id",
                                    title: '<img src="/build/images/material-dashboard/img/office-dark.jpg" class="w-100"><span class="mt-3 badge badge-sm bg-gradient-primary">Pending</span><p class="text mt-2">Website Design: New cards for blog section and profile details</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">3</span></div><div class="avatar-group ms-auto"><a href="javascript:" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-1.jpg" class=""></a><a href="javascript:;" class="avatar avatar-xs rounded-circle me-2" data-toggle="tooltip" data-original-title="Audrey Love"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-2.jpg" class="rounded-circle"></a><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Michael Lewis"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-3.jpg" class="rounded-circle"></a></div></div>',
                                    assignee: "Done Joe",
                                    description: "This task's description is for something, but not for anything",
                                    class: ["border-radius-xl"]
                                },
                            ]
                        },
                        {
                            id: "_working",
                            title: "In review",
                            item: [{
                                id: "_task_do_something_2_id",
                                title: '<span class="badge badge-sm bg-gradient-warning">In Testing</span><p class="text mt-2">Responsive Changes</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">11</span></div><div class="avatar-group ms-auto"><a href="javascript" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jana Lucie"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-3.jpg" class=""></a><a href="javascript" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-2.jpg" class=""></a></div></div>',
                                assignee: "Done Joe",
                                description: "This task's description is for something, but not for anything",
                                class: ["border-radius-xl"]
                            },
                                {
                                    id: "_task_run_id",
                                    title: '<span class="badge badge-sm bg-gradient-success">In review</span><p class="text mt-2 mb-1">Change images dimension</p><div class="col"><div class="progress progressm mb-3 w5"><div class="progress-bar bg-gradient-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"></div></div></div><div class="d-flex"><div class="avatar-group ms-auto"><a href="javascript" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-3.jpg" class=""></a></div></div>',
                                    assignee: "Done Joe",
                                    description: "This task's description is for something, but not for anything",
                                    class: ["border-radius-xl"]
                                },
                                {
                                    id: "_task_do_something_3_id",
                                    title: '<span class="badge badge-sm bg-gradient-info">In Review</span><p class="text mt-2 mb-1">Update Links</p><div class="col"><div class="progress progressm mb-3 w5"><div class="progress-bar bg-gradient-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;"></div></div></div><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">6</span></div><div class="avatar-group ms-auto"><a href="javascript" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jana Lucie"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-5.jpg" class=""></a><a href="javascript" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Mike Alis"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-1.jpg" class=""></a></div></div>',
                                    assignee: "Done Joe",
                                    description: "This task's description is for something, but not for anything",
                                    class: ["border-radius-xl"]
                                }
                            ]
                        },
                        {
                            id: "_done",
                            title: "Done",
                            item: [{
                                id: "_task_all_right_id",
                                title: '<img src="/build/images/material-dashboard/img/home-decor-1.jpg" class="w-100"><span class="mt-3 badge badge-sm bg-gradient-success">Done</span><p class="text mt-2">Redesign for the home page</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">8</span></div><div class="avatar-group ms-auto"><a href="javascript" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-5.jpg" class=""></a><a href="javascript" class="avatar avatar-xs rounded-circle me-2" data-toggle="tooltip" data-original-title="Audrey Love"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-1.jpg" class="rounded-circle"></a><a href="javascript" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Michael Lewis"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-4.jpg" class="rounded-circle"></a></div></div>',
                                assignee: "Done Joe",
                                description: "This task's description is for something, but not for anything",
                                class: ["border-radius-xl"]
                            },
                                {
                                    id: "_task_ok_id",
                                    title: '<span class="badge badge-sm bg-gradient-success">Done</span><p class="text mt-2">Schedule winter campaign</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">2</span></div><div class="avatar-group ms-auto"><a href="javascript" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Michael Laurence"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-1.jpg" class=""></a><a href="javascript" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Michael Lewis"><img alt="Image placeholder" src="/build/images/material-dashboard/img/team-4.jpg" class="rounded-circle"></a></div></div>',
                                    assignee: "Done Joe",
                                    description: "This task's description is for something, but not for anything",
                                    class: ["border-radius-xl"]
                                }
                            ]
                        }
                    ]
                });

                let addBoardDefault = document.getElementById("jkanban-add-new-board");
                addBoardDefault.addEventListener("click", function() {
                    let newBoardName = document.getElementById("jkanban-new-board-name")
                        .value;
                    let newBoardId = "_" + newBoardName.toLowerCase().replace(/ /g, "_");
                    KanbanTest.addBoards([{
                        id: newBoardId,
                        title: newBoardName,
                        item: []
                    }]);
                    document.querySelector('#new-board-modal').classList.remove('show');
                    document.querySelector('body').classList.remove('modal-open');

                    document.querySelector('.modal-backdrop').remove();
                });

                let updateTask = document.getElementById("jkanban-update-task");
                updateTask.addEventListener("click", function() {
                    let jkanbanInfoModalTaskId = document.querySelector(
                        "#jkanban-info-modal #jkanban-task-id"
                    );
                    let jkanbanInfoModalTaskTitle = document.querySelector(
                        "#jkanban-info-modal #jkanban-task-title"
                    );
                    let jkanbanInfoModalTaskAssignee = document.querySelector(
                        "#jkanban-info-modal #jkanban-task-assignee"
                    );
                    let jkanbanInfoModalTaskDescription = document.querySelector(
                        "#jkanban-info-modal #jkanban-task-description"
                    );
                    KanbanTest.replaceElement(jkanbanInfoModalTaskId.value, {
                        title: jkanbanInfoModalTaskTitle.value,
                        assignee: jkanbanInfoModalTaskAssignee.value,
                        description: jkanbanInfoModalTaskDescription.value
                    });
                    document.querySelector('#jkanban-info-modal').classList.remove('show');
                    document.querySelector('body').classList.remove('modal-open');
                    document.querySelector('.modal-backdrop').remove();
                });
            }
        })();
    }
}
