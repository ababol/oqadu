import os.path
from os import path, access, R_OK
# To change this template, choose Tools | Templates
# and open the template in the editor.

__author__="isen"
__date__ ="$22 oct. 2013 13:19:43$"

import os

##
# FileFactory : a static class providing some process on the file system using os lib
##
class FileFactory:

    ##
    # createFolder : creates a folder to the specified path
    #
    # @arg path : the specified path to create the new folder
    # @arg foldername : the name of the new folder
    #
    # @return : returns the path to the created folder
    #
    # @raise : TypeError
    ##
    @staticmethod
    def createFolder(path, foldername):

        if( not isinstance(path, str) and not isinstance(path, unicode)):
            raise TypeError('path must be a string or a unicode object')
        if( not isinstance(foldername, str) and not isinstance(foldername, unicode)):
            raise TypeError('foldername must be a string or a unicode object')

        savedPath = os.getcwdu()
        try:
            os.chdir(path)
            listdir = os.listdir('./')
            dirs = [d for d in listdir if os.isdir(d)]
            if foldername not in dirs:
                os.mkdir(foldername,0755)
        finally:
            os.chdir(savedPath)

        return path + os.sep + foldername


    ##
    # createFile : creates a file to the specified path
    #
    # @arg path : the specified path to create the new file
    # @arg filename : the name of the new file
    # @arg content : the initial content. default = ''
    #
    # @return : returns the path to the created file
    #
    # @raise : TypeError
    ##
    @staticmethod
    def createFile(path, filename, content = ''):

        if( not isinstance(path, str) and not isinstance(path, unicode)):
            raise TypeError('path must be a string or a unicode object')
        if( not isinstance(filename, str) and not isinstance(filename, unicode)):
            raise TypeError('filename must be a string or a unicode object')

        savedPath = os.getcwdu()
        try:
            os.chdir(path)
            listdir = os.listdir('./')
            files = [f for f in listdir if os.isfile(f)]
            if filename not in files:
                f = file(filename,'w')
                FileFactory.write(path+os.sep+filename, content)
        finally:
            os.chdir(savedPath)

        return path + os.sep + filename


    ##
    # write : writes some content int the file located to the specified path
    #
    # @arg path : the specified path to the file
    # @arg content : the content to write in the file
    #
    # @raise : TypeError
    ##
    @staticmethod
    def write(path, content):

        if( not isinstance(path, str) and not isinstance(path, unicode)):
            raise TypeError('path must be a string or a unicode object')
        if( not isinstance(content, str) and not isinstance(content, unicode)):
            raise TypeError('content must be a string or a unicode object')

        file = open(path,'w')
        file.write(content)
        file.close()


    ##
    # splitPath : split the specified path into a file name or a directory name and its localisation.
    #
    # examples :    path/to/the/filename.txt ==> path/to/the, filename.txt
    #               path/to/the/directoryname ==> path/to/the, directoryname
    #               path/to/the/directoryname/ ==> path/to/the, directoryname
    #
    # @arg path : the specified path
    #
    # @return : a name and the new path as :  new path, name
    #
    # @raise : TypeError
    ##
    @staticmethod
    def splitPath(path):
        if(not isinstance(path, str) and not isinstance(path, unicode)):
            raise TypeError('path must be a string or a unicode object')

        entitypath, entityname = os.path.split(path)
        return entitypath, entityname


    ##
    # buildPath : access to the specified path creating missing directories.
    #
    # @arg path : the specified path
    #
    # @raise : TypeError
    ##
    @staticmethod
    def buildPath(path):
        if(not isinstance(path, str) and not isinstance(path, unicode)):
            raise TypeError('path must be a string or a unicode object')
        entitypath, entityname = FileFactory.splitPath(path)
        local = open(path,'w')
        print local
        if local != null :
                 f = open(entityname,'w')
                 f.read()
    
