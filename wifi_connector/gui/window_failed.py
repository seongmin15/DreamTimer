# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'window_failed.ui'
#
# Created by: PyQt5 UI code generator 5.15.9
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_Failed_window(object):
    def setupUi(self, Failed_window):
        Failed_window.setObjectName("Failed_window")
        Failed_window.resize(569, 200)
        self.label = QtWidgets.QLabel(Failed_window)
        self.label.setGeometry(QtCore.QRect(30, 10, 521, 111))
        font = QtGui.QFont()
        font.setFamily("맑은 고딕")
        font.setPointSize(26)
        font.setBold(True)
        font.setWeight(75)
        self.label.setFont(font)
        self.label.setObjectName("label")
        self.okBtn = QtWidgets.QPushButton(Failed_window)
        self.okBtn.setGeometry(QtCore.QRect(190, 130, 191, 61))
        font = QtGui.QFont()
        font.setFamily("맑은 고딕")
        font.setPointSize(22)
        font.setBold(True)
        font.setWeight(75)
        self.okBtn.setFont(font)
        self.okBtn.setObjectName("okBtn")

        self.retranslateUi(Failed_window)
        QtCore.QMetaObject.connectSlotsByName(Failed_window)

    def retranslateUi(self, Failed_window):
        _translate = QtCore.QCoreApplication.translate
        Failed_window.setWindowTitle(_translate("Failed_window", "WIFI Connector"))
        self.label.setText(_translate("Failed_window", "WIFI Connection Failed!!!"))
        self.okBtn.setText(_translate("Failed_window", "OK"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    Failed_window = QtWidgets.QWidget()
    ui = Ui_Failed_window()
    ui.setupUi(Failed_window)
    Failed_window.show()
    sys.exit(app.exec_())
