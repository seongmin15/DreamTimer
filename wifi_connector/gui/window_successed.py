# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'window_successed.ui'
#
# Created by: PyQt5 UI code generator 5.15.9
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_Successed_window(object):
    def setupUi(self, Successed_window):
        Successed_window.setObjectName("Successed_window")
        Successed_window.resize(569, 200)
        self.label_2 = QtWidgets.QLabel(Successed_window)
        self.label_2.setGeometry(QtCore.QRect(30, 0, 521, 111))
        font = QtGui.QFont()
        font.setFamily("맑은 고딕")
        font.setPointSize(26)
        font.setBold(True)
        font.setWeight(75)
        self.label_2.setFont(font)
        self.label_2.setObjectName("label_2")
        self.okBtn = QtWidgets.QPushButton(Successed_window)
        self.okBtn.setGeometry(QtCore.QRect(190, 120, 191, 61))
        font = QtGui.QFont()
        font.setFamily("맑은 고딕")
        font.setPointSize(22)
        font.setBold(True)
        font.setWeight(75)
        self.okBtn.setFont(font)
        self.okBtn.setObjectName("okBtn")

        self.retranslateUi(Successed_window)
        QtCore.QMetaObject.connectSlotsByName(Successed_window)

    def retranslateUi(self, Successed_window):
        _translate = QtCore.QCoreApplication.translate
        Successed_window.setWindowTitle(_translate("Successed_window", "WIFI Connector"))
        self.label_2.setText(_translate("Successed_window", "WIFI Connection Success"))
        self.okBtn.setText(_translate("Successed_window", "OK"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    Successed_window = QtWidgets.QWidget()
    ui = Ui_Successed_window()
    ui.setupUi(Successed_window)
    Successed_window.show()
    sys.exit(app.exec_())