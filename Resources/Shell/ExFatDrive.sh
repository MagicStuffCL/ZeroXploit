#!/bin/sh

fdisk /dev/mmcblk0 <<EEOF
d
6
w
EEOF
partprobe
fdisk /dev/mmcblk0 <<EEOF
d
5
w
EEOF
partprobe
fdisk /dev/mmcblk0 <<EEOF
d
4
w
EEOF
partprobe
fdisk /dev/mmcblk0 <<EEOF
n
p
4


w
EEOF
partprobe
mkfs.exfat /dev/mmcblk0p4 -n pExtUSB
modprobe fuse
