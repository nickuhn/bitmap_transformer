#Bitmap Transformer

This project takes in a bitmap file. Reads it into a buffer and then performs a transform on the buffer. After the transform is complete it writes the stream to a new file.

##To Run:

Runs from the command line using:
node index.js [dir] [flag]

###bufferReader

bufferReader takes in a file directory and flag. It then determines whether the file is a paletted bitmap, or nonpaletted bitmap.

After deciding which type of file it is dealing with it calls transform.js and depending on the flag performs different transforms on the file.

Finally it takes the buffer and creates a new file in the same directory with "transformed" added to the file name.

###transform

transform takes in a bit of data and performs a transform on it causing the overall bitmap to change.

####Flags Available:

* i - invertes the colors
* gy - grayscales the image
* g - greenscales the image
* b - blue scales the image
* r - red scales the image
* rd - gives a paletted bitmap random colors, gives a non-paletted bitmap a completely random output
