let contactData = [{
    "userID": 1,
    "password": "beispielpasswort",
    "email": "beispielemail",
    "userName":"Herrlich",
    "userFirstName":"Tom",
    "contacts": [{
        "id": 0,
        "first": "Anton",
        "name": "Mayer",
        "email": "antom@gmail.com",
        "phone": "+49 1111 111 11 1",
        "avatarColor": "orange"


    },
    {
        "id": 1,
        "first": "Anja",
        "name": "Schulz",
        "email": "schulz@hotmail.com",
        "phone": "+49 2222 222 22 2",
        "avatarColor": "purple"
    },
    {
        "id": 2,
        "first": "Benedikt",
        "name": "Ziegler",
        "email": "benedikt@gmail.com",
        "phone": "+49 3333 333 33 3",
        "avatarColor": "blue"
    },
    {
        "id": 3,
        "first": "David",
        "name": "Eisenberg",
        "email": "davidberg@gmail.com",
        "phone": "+49 4444 444 44 4",
        "avatarColor": "pink"
    },
    {
        "id": 4,
        "first": "Eva",
        "name": "Fischer",
        "email": "eva@gmail.com",
        "phone": "+49 5555 555 55 5",
        "avatarColor": "yellow"
    },
    {
        "id": 5,
        "first": "Emmanuel",
        "name": "Mauer",
        "email": "emmanuelma@gmail.com",
        "phone": "+49 6666 666 66 6",
        "avatarColor": "green"
    },
    {
        "id": 6,
        "first": "Marcel",
        "name": "Bauer",
        "email": "bauer@gmail.com",
        "phone": "+49 7777 777 77 7",
        "avatarColor": "darkblue"
    },
    {
        "id": 7,
        "first": "Anton",
        "name": "Mayer",
        "email": "wolf@gmail.com",
        "phone": "+49 8888 888 88 8",
        "avatarColor": "red"
    }],

    "tasks": [{
        'toDo': [{
            "taskID": 1,
            "title": "Title JSON TO DO",
            "description": "Testdescription for To Do rendering",
            "assigned_contacts": [
                {
                    "id": 2,
                    "first": "Benedikt",
                    "name": "Ziegler",
                    "email": "benedikt@gmail.com",
                    "phone": "+49 3333 333 33 3",
                    "avatarColor": "blue"
                },
                {
                    "id": 3,
                    "first": "David",
                    "name": "Eisenberg",
                    "email": "davidberg@gmail.com",
                    "phone": "+49 4444 444 44 4",
                    "avatarColor": "pink"
                },
            ],
            "dueDate": "2024-03-23",
            "category": "User Story",
            "prio": 0,

            "subtasks": [
                {
                    "subtask1": "done",
                    "subtask2": "notDone"
                }
            ]
        }],
        'inProgress': [{
            "taskID": 2,
            "title": "For In Progress",
            "description": "Testdescriptionfor in progress",
            "assigned_contacts": [
                {
                    "id": 2,
                    "first": "Kalle",
                    "name": "Hausen",
                    "email": "benedikt@gmail.com",
                    "phone": "+49 3333 333 33 3",
                    "avatarColor": "yellow"
                },
                {
                    "id": 3,
                    "first": "Lea",
                    "name": "Kranz",
                    "email": "davidberg@gmail.com",
                    "phone": "+49 4444 444 44 4",
                    "avatarColor": "lightblue"
                },
            ],
            "dueDate": "2024-03-25",
            "category": "Technical Task",
            "prio": 2,

            "subtasks": [
                {
                    "subtask1": "done",
                    "subtask2": "done"
                }
            ]
        }],
        'awaitFeedback': [
            {
                "taskID": 3,
                "title": "For Await Feedback",
                "description": "Testdescriptionfor in progress",
                "assigned_contacts": [
                    {
                        "id": 3,
                        "first": "Kalle",
                        "name": "Hausen",
                        "email": "benedikt@gmail.com",
                        "phone": "+49 3333 333 33 3",
                        "avatarColor": "yellow"
                    },
                    {
                        "id": 3,
                        "first": "Lea",
                        "name": "Kranz",
                        "email": "davidberg@gmail.com",
                        "phone": "+49 4444 444 44 4",
                        "avatarColor": "lightblue"
                    },
                ],
                "dueDate": "2024-03-25",
                "category": "Technical Task",
                "prio": 2,

                "subtasks": [
                    {
                        "subtask1": "done",
                        "subtask2": "done"
                    }
                ]
            }
        ],
        'done': [
            {
                "taskID": 4,
                "title": "For Done",
                "description": "Testdescriptionfor in progress",
                "assigned_contacts": [
                    {
                        "id": 2,
                        "first": "Kalle",
                        "name": "Hausen",
                        "email": "benedikt@gmail.com",
                        "phone": "+49 3333 333 33 3",
                        "avatarColor": "yellow"
                    },
                    {
                        "id": 3,
                        "first": "Lea",
                        "name": "Kranz",
                        "email": "davidberg@gmail.com",
                        "phone": "+49 4444 444 44 4",
                        "avatarColor": "lightblue"
                    },
                ],
                "dueDate": "2024-03-25",
                "category": "Technical Task",
                "prio": 2,

                "subtasks": [
                    {
                        "subtask1": "done",
                        "subtask2": "done"
                    }
                ]
            }
        ]
    }],
}]


