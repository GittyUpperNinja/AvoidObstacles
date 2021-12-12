Player = document.getElementById("Player")
Block = document.getElementById("Obstacle")
Score = document.getElementById("Score")
HighScore = document.getElementById("HighScore")
IsJumping = false
ScoreNum = 0
HighScoreNum = 0
BehindPlayer = false

function JumpAction()
{
    if (!IsJumping)
    {
        Player.classList.add("Jump")
        IsJumping = true
    }
    setTimeout(function(){
        Player.classList.remove("Jump")
        IsJumping = false
    }, 1000)
}

document.addEventListener("keydown", function(Event) {
    if (!IsJumping)
    {
        if (Event.key === " ") {
            JumpAction()
        }
    }
})

document.addEventListener("touchstart", function(Event)
{
    if (!IsJumping)
    {
        JumpAction()
    }  
})

setInterval(function()
{
    PlayerProperties = getComputedStyle(Player)
    BlockProperties = getComputedStyle(Block)

    PlayerTop = parseInt(PlayerProperties.getPropertyValue("top"))
    PlayerWidth = parseInt(PlayerProperties.getPropertyValue("width"))
    PlayerHeight = parseInt(PlayerProperties.getPropertyValue("height"))
    PlayerLeft = parseInt(PlayerProperties.getPropertyValue("left"))

    BlockLeft = parseInt(BlockProperties.getPropertyValue("left"))
    BlockWidth = parseInt(BlockProperties.getPropertyValue("width"))
    BlockHeight = parseInt(BlockProperties.getPropertyValue("height"))
    BlockTop = parseInt(BlockProperties.getPropertyValue("top"))

    if (BlockTop <= PlayerTop + PlayerHeight && BlockLeft <= PlayerLeft + PlayerWidth && BlockLeft + BlockWidth >= PlayerLeft)
    {
        if (ScoreNum > HighScoreNum)
        {
            HighScoreNum = ScoreNum
            HighScore.textContent = "High Score: " + HighScoreNum
        }
        BehindPlayer = true
        ScoreNum = 0
        Score.textContent = ScoreNum
    } else if (BlockLeft <= PlayerLeft && BehindPlayer == false)
    {
        BehindPlayer = true
        ScoreNum += 1
        Score.textContent = ScoreNum
    } else if (BlockLeft > PlayerLeft)
    {
        BehindPlayer = false
    }
}, 10);