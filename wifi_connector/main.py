import sys
import os
import nmcli

from PyQt5.QtWidgets import QMainWindow, QApplication, QDesktopWidget
from PyQt5.QtCore import QCoreApplication

from gui.keyboard_window import KeyboardWindow
from gui.window_main import Ui_main_window as main_window
from gui.successed_window import SuccessedWindow
from gui.failed_window import FailedWindow


class MainWindow(QMainWindow, main_window):
    def __init__(self, parent=None):
        super(MainWindow, self).__init__(parent)
        QMainWindow.__init__(self, parent)
        self.setupUi(self)

		# create an instance of the Keyboard
		# add self as a parameter for callback
        self.kb = KeyboardWindow(callback=self)
        self.sw = SuccessedWindow(callback=self)
        self.fw = FailedWindow(callback=self)

        self.focused_input = None

		# initialize click event on the input
		# for calling keyboard popup
        self.lineEdit.mousePressEvent = self.lineEdit_clicked
        self.refreshBtn.mousePressEvent = self.refresh_clicked
        self.connectBtn.mousePressEvent = self.connect_clicked
        # self.closeBtn.clicked.connect(QCoreApplication.instance().quit)
        self.closeBtn.clicked.connect(self.finish)

        ssids_list = []
        nmcli.device.wifi_rescan()
        wifis = nmcli.device.wifi()
        for wifi in wifis:
            if wifi.ssid != '':
                ssids_list.append(wifi.ssid)
        ssids = list(set(ssids_list))
        for ssid in ssids:
            self.listWidget.addItem(ssid)
        self.center()

    def center(self):
        qr = self.frameGeometry()
        cp = QDesktopWidget().availableGeometry().center()
        qr.moveCenter(cp)
        self.move(qr.topLeft())

    def finish(a,b):
        os.system('xdotool windowactivate $(xdotool search --name "react")')
        # QCoreApplication.instance().quit()

    def lineEdit_clicked(self, e):
        self.focused_input = self.lineEdit
        self.kb.show()

    def on_key(self, keys):
        if self.focused_input is not None:
            self.focused_input.setText(keys)

    def refresh_clicked(self, e):
        self.listWidget.clear()
        ssids_list = []
        nmcli.device.wifi_rescan()
        wifis = nmcli.device.wifi()
        for wifi in wifis:
            if wifi.ssid != '':
                ssids_list.append(wifi.ssid)
        ssids = list(set(ssids_list))
        for ssid in ssids:
            self.listWidget.addItem(ssid)

    def connect_clicked(self, e):
        try:
            SSID = self.listWidget.currentItem().text()
            password = self.lineEdit.text()
            print({"SSID": SSID, "password": password})
            result = nmcli.device.wifi_connect(SSID, password)
            print(result)
            if result == None:
                self.sw.show()
        except Exception as err:
            print(err)
            self.fw.show()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    m_window = MainWindow(None)
    m_window.show()
    sys.exit(app.exec())
