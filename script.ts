
type Player = "X" | "O" | null

class TicTacToc {
    private board: Player[] = []
    private currentPlayer: Player = "X"
    private isGameOver: boolean = false
    private statusElement: HTMLElement
    private resetButton: HTMLElement

    constructor(statusElement: HTMLElement, resetButton: HTMLElement) {
        console.log("Objeto creado")
        this.statusElement = statusElement
        this.resetButton = resetButton

        for (let i = 0; i < 9; i++) {
            this.board.push(null)
        }
        this.initializeGame()

    }

    private initializeGame = () => {
        const boardContainer = document.querySelectorAll<HTMLElement>(".grid-item")
        boardContainer.forEach((cell, index) => {
           
            cell.addEventListener("click", () => this.handleMove(index))
        })
        this.renderBoard()
        this.statusElement.textContent = `Turno: ${this.currentPlayer}`
        this.resetButton.addEventListener("click", ()=> this.reset())
        
    } 

    private renderBoard = () => {
        const boardContainer = document.querySelectorAll<HTMLElement>(".grid-item")
        boardContainer.forEach((cell, index) => {
            cell.textContent = this.board[index]
        })
    }

    private handleMove = (index:number) => {
        //para usar template string alt+96 en teclado espanol-latino
        //para usar template string en teclado ingles es la tecla debajo del esc
        console.log(`1 le di click a la celda: ${index}` )
       if (this.board[index] !== null || this.isGameOver) {
        return
       }
      
        this.board[index] = this.currentPlayer
        this.renderBoard()

        if(this.checkWinner()) {
            //ganador
            this.statusElement.textContent = `Ganador: ${this.currentPlayer}`
            this.isGameOver = true
        } else if (this.board.every((cell) => cell !== null)) {
            //empate
            this.statusElement.textContent = "Empate!"
            this.isGameOver = true
        } else {
            // juego sigue
            this.currentPlayer = this.currentPlayer === "X" ? "O" : "X"
            this.statusElement.textContent = `Turno: ${this.currentPlayer}`
        }




    }

    private checkWinner = () => {
        
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6] 
        ]

        for (let i = 0; i < winningCombinations.length; i++) {
            
            const [a,b,c] = winningCombinations[i]


            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return true
            }
        }

        return false

    }

    private reset = () => {
        this.board.forEach((_,index) => {
            this.board[index] = null
        })
        this.currentPlayer = "X"
        this.isGameOver = false
        this.statusElement.textContent = `Turno: ${this.currentPlayer}`
        this.renderBoard()
    }

}



const main = () => {
    console.log("Se ejecuto el main")
    const statusElement = document.getElementById("game-status")!
    const resetButton = document.getElementById("reset-button")!
    new TicTacToc(statusElement, resetButton)
}

main()