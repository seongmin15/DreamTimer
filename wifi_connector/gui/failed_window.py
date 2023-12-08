import sys

from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QMainWindow, QApplication, QDesktopWidget

from gui.window_failed import Ui_Failed_window as failed_window

class FailedWindow(QMainWindow, failed_window):
    def __init__(self, callback=None, parent=None):
        super(FailedWindow, self).__init__(parent)
        QMainWindow.__init__(self, parent)
        self.setupUi(self)
        self.setWindowFlags(Qt.WindowCloseButtonHint)
        self.setWindowModality(Qt.ApplicationModal)

        self.okBtn.clicked.connect(self.close)
        self.center()

    def center(self):
        qr = self.frameGeometry()
        cp = QDesktopWidget().availableGeometry().center()
        qr.moveCenter(cp)
        self.move(qr.topLeft())

def main():
	app = QApplication(sys.argv)
	s_window = FailedWindow()
	s_window.show()

	try:
		while True:
			app.processEvents()

	except KeyboardInterrupt:
		pass
	s_window.close()
	app.quit()


if __name__ == '__main__':
	main()
