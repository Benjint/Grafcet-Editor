# GRAFCET Editor

A simple tool to draw grafcet online !

To use it, simply clone this repository, then install the packages using ```npm install```. Then run the server using ```npm run start```. You're then all set !

To place an element, simply drag and drop it where you want to, you can edit any value by double clicking on them.
To delete an element, right click on it.
You can save your work using the **Save** Button, it will create a file with the specified name and download it to json.
You can then import your work in the app using the **Open** Button.
If you want to "print" your work, click the **Export** Button it will create and download a png image using the specified name

To add a rising edge, put a ```//``` in front of the letter, to put a lowering edge, put a ```\ ```
To add a bar above letters, encapsulate them between ```!(``` and ```)```. For exemple, ```!(abc)``` will give ```a̅b̅c̅```