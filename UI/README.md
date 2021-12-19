# MarsRoverSimulator

# Description

● The application is a simulation of a Mars rover moving on a square surface, of
dimensions 10 units x 10 units.
● There are no other obstructions on the surface.
● The rover is free to roam around the surface, but must be prevented from
falling to destruction. Any movement that would result in the rover falling from the
table must be prevented, however further valid movement commands must still be
allowed.
● Create an application that can read in commands of the following form:
○ PLACE X,Y,Direction
○ Forward
○ Backward
○ LEFT
○ RIGHT
○ REPORT
● PLACE will put the Mars rover on the surface in position X,Y and facing NORTH, SOUTH,
EAST or WEST.
● The origin (0,0) can be considered to be the SOUTH WEST most corner.
● The first valid command to the robot is a PLACE command, after that, any sequence
of commands may be issued, in any order, including another PLACE command. The
application should discard all commands in the sequence until a valid PLACE
command has been executed.
● Forward (F) will move the Mars rover one unit forward in the direction it is currently facing.
● Backward (B) will move the Mars rover one unit backward in the direction it is currently facing.
● LEFT (L) and RIGHT (R) will rotate the robot 90 degrees in the specified direction without
changing the position of the robot.
● REPORT will announce the X,Y and Direction of the robot. This can be in any form, but
standard output is sufficient.
● A robot that is not on the table can choose the ignore the MOVE, LEFT, RIGHT and
REPORT commands.

# Constraints

○ Example Input and Output:
i. PLACE 0,0,NORTH
MOVE 'FFRFRBLF'
REPORT
Output: 2,3,EAST
