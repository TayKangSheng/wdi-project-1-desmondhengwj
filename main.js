$(document).ready(function () {
// 1st function: function Question
  function Question (qn, ans, correctAnsIndex) {
    this.question = qn
    this.choices = ans
    this.correctAnswer = correctAnsIndex
  }

  // var player1Name = prompt("Player 1's name")
  // var player2Name = prompt("Player 2's name")

  var qn0 = new Question('Bukit Timah is about 166m high.', ['True', 'False'], 0)
  var qn1 = new Question('The oldest building at Clarke Quay is The Central', ['True', 'False'], 1)
  var qn2 = new Question('You can find the national anthem in microtext on the back of the $100 note.', ['True', 'False'], 1)
  var qn3 = new Question('Singaporeans can vote in the British Elections.', ['True', 'False'], 0)
  var qn4 = new Question('World Toilet Organization was created in Singapore.', ['True', 'False'], 0)
  var qn5 = new Question('The youngest person to pass the GCE O Levels Chemistry Paper is a Singaporean.', ['True', 'False'], 0)
  var qn6 = new Question('Buildings in Singapore cannot be higher than 280 metres.', ['True', 'False'], 0)
  var qn7 = new Question('Singapore is a city of not just one island, but 53.', ['True', 'False'], 1)
  var qn8 = new Question('Singapore have remained in the same time-zone since it\'s independence.', ['True', 'False'], 1)
  var qn9 = new Question('The lowest temperature ever recorded in Singapore is 19.4°C.', ['True', 'False'], 0)
  var qn10 = new Question('Singapore is home to the youngest iPhone developer in the world.', ['True', 'False'], 0)
  var qn11 = new Question('Singapore\'s independence day is on August 9 1945.', ['True', 'False'], 1)
  var qn12 = new Question('There is a hug-me Coca-Cola machine in Singapore.', ['True', 'False'], 0)
  var qn13 = new Question('Singapore has the 1st night zoo in the world.', ['True', 'False'], 0)
  var qn14 = new Question('Singapore has the highest man-made waterfall in the world.', ['True', 'False'], 0)
  var qn15 = new Question('Singapore has the highest density of McDonald\'s in the world.', ['True', 'False'], 0)

  var quiz = {
    currentQns: 0,
    totalQns: [qn0, qn1, qn2, qn3, qn4, qn5, qn6, qn7, qn8, qn9, qn10, qn11, qn12, qn13, qn14, qn15],
    isGameOver: false,
    player1Points: 0,
    player2Points: 0
  }

// 2nd function: function numberOfQuestions

  function numberOfQuestions () {
    return 10
  }

// 3rd function: function shuffle
// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  function shuffle (a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]]
    }
  }
  // }

  shuffle(quiz.totalQns)

// 4th function: function currentQuestion
  function currentQuestion () {
    return quiz.currentQns
  }

// 5th function: function numberOfChoices
  function numberOfChoices () {
    return quiz.totalQns[currentQuestion()].correctAnswer
  }

// 6th function: function numberOfChoices
  function numberOfChoices () {
    return quiz.totalQns[quiz.currentQns].choices.length
  }

// 7th function: function playTurn
  function playTurn (selection) {
    var playerAns

    if (quiz.isGameOver === true) {
      return false
    }

    if (correctAnswer() === selection) {
      playerAns = true
      if (quiz.currentQns % 2 === 0) {
        quiz.player1Points++
      } else if (quiz.currentQns % 2 !== 0) {
        quiz.player2Points++
      }
    }

    if (correctAnswer() !== selection) {
      playerAns = false
    }
    quiz.currentQns++

    if (currentQuestion() === numberOfQuestions()) {
      quiz.isGameOver = true
    }
    return playerAns
  }

// 8th function: function isGameOver
  function isGameOver () {
    if (quiz.isGameOver === true) {
      return true
    } else {
      return false
    }
  }

// 9th function: function whoWon
  function whoWon () {
    if (isGameOver() === false) {
      return 0
    } else if (quiz.player1Points > quiz.player2Points) {
      return 1
    } else if (quiz.player2Points > quiz.player1Points) {
      return 2
    } else if (quiz.player1Points === quiz.player2Points) {
      return 3
    }
  }

// 10th function: function restart
  function restart () {
    quiz.currentQns = 0
    quiz.isGameOver = false
    quiz.player1Points = 0
    quiz.player2Points = 0
    location.reload()
  }

// 11th function: function updateQuiz
  function updateQuiz () {
    if (quiz.currentQns % 2 === 0) {
      $('#QnNo').html('Question ' + (currentQuestion() + 1) + ' ' + '(Player One)')
    } else if (quiz.currentQns % 2 !== 0) {
      $('#QnNo').html('Question ' + (currentQuestion() + 1) + ' ' + '(Player Two)')
    }

    $('#quizQns').html(quiz.totalQns[currentQuestion()].question)
    $('#player1Score').html('Player 1' + ' : ' + quiz.player1Points)
    $('#player2Score').html('Player 2' + ' : ' + quiz.player2Points)

    if (isGameOver() === true) {
      $('#QnNo').text('')
      if (whoWon() === 3) {
        $('#quizQns').text("It's a Draw!")
      } else {
        $('#quizQns').text('Game Over! Player ' + whoWon() + ' wins!')
      }
      $('#replayBtn').toggle()
    }
  }

  $('.ansButton').click(function () {
    var selection
    var choice = this.id
    if (choice === 'trueBtn') {
      selection = 0
    }
    if (choice === 'falseBtn') {
      selection = 1
    }

    if (isGameOver() === true) {
      $j('.ansButton').attr('onclick', '').unbind('click')
    }

    playTurn(selection)
    updateQuiz()
  })

// 12th function: function hide
  function hide () {
    $('#startQuizBtn').style.display = 'none'
  }

  $('#startQuizBtn').click(function () {
    $('.container').toggle()
    $('#startQuizBtn').hide()
    updateQuiz()
  })

  $('#replayBtn').click(function () {
    restart()
  })
})
