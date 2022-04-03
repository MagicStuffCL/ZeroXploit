#!/bin/sh

LinPart=$1
fdisk /dev/mmcblk0 <<EEOF
d
4
w
EEOF
partprobe
fdisk /dev/mmcblk0 <<EEOF
n
e


w
EEOF
partprobe
fdisk /dev/mmcblk0 <<EEOF
n

+${LinPart}G
w
EEOF
partprobe
fdisk /dev/mmcblk0 <<EEOF
n


w
EEOF
partprobe
mkfs.fat -I /dev/mmcblk0p5 -F 32 -n PFAT32USB
mkfs.exfat /dev/mmcblk0p6 -n pExFatUSB
