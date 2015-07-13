#Bitmap Transformer

This project takes in a bitmap file. Reads it into a buffer and then performs a transform on the buffer. After the transform is complete it writes the stream to a new file.

The project uses 2 modules bufferReader.js and transform.js, tied together by index.js.

##To Run:

Runs from the command line using:
node index.js [dir] [flag]

###index.js

Index.js is the file that ties everything together. It takes in the command line arguments, builds a new buffer object by calling bufferReader.js.

It then determines the endianness of the system and adjusts the applicable buffer object values.

Finally depending on the buffer object values it alls the applicable transformer methods and saves the transformed buffer as a new file.

###bufferReader.js

Creates an object that stores all applicable buffer info.

This object also has methods on it to call on transform.js in different ways depending on the transform required and type of file passed in.

The final method on the object writes the buffer to a new file saved in the same directory but with the added info of what transform had been performed on it.

###transform.js

Transform.js takes in a bit of data and performs a transform on it causing the overall bitmap to change. The transform performed depends on the flag passed in on the command line.

####Flags Available:

* i - invertes the colors
* gy - grayscales the image
* g - greenscales the image
* b - blue scales the image
* r - red scales the image
* rd - gives a paletted bitmap random colors, gives a non-paletted bitmap a completely random output
