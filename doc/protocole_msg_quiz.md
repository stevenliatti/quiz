```json
MESSAGE : JOIN
{
	token,
    idUser,
    idQuiz
}

MESSAGE : NEW_QUESTION
{
    idQuestion,
    question,
    answers [ {id, content} ],
	time,
	status {START, IN_PROGRESS, END},
	questionCount,
	questionIndex

	/* verifier si necessaire */
	idUser,
	idQuiz
}


MESSAGE : ANSWER / ANSWER_CONFIRM
{
    idQuestion,
    idAnswer,
    status { TIMEOUT, CHECK }
    score,
	coefficient,

	/* verifier si necessaire */
	idUser,
	idQuiz
}
```

```sequence
TITLE : Protocole d'échange de message
Note left of Server: HTTP
Client->Server: REQUEST
Server-->Client: HTML + JS
Note right of Client: SOCKET.IO
Client->Server: CONNECT()
Server->Client: JOIN [idUser + idQuiz]
Client->Server: NEXT_QUESTION
Server->Client: NEW_QUESTION
Client->Server: ANSWER
Server->Client: ANSWER_CONFIRM



```

