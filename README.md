## How To Run 


1. Open powershell as Administrator and type command `Get-ExecutionPolicy` after that type another command `Set-ExecutionPolicy Unrestricted` OR `Set-ExecutionPolicy RemoteSigned`.
2. If prompted, type Y to confirm.
3. Now open the project folder and also open seprate terminal, type another command `json-server --watch ./database/db.json --port 3001` hit enter now JSON server start running. Don't close the terminal.
4. In project folder again open seprate terminal or powershell and type a command `npm i` to install all packages.
5. To run the code `npm run dev`
