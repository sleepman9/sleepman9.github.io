import webbrowser
import threading
import logging

# 配置日志记录
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# 要打开的图片网站列表
urls = [
    "https://images.google.com/"
    # "https://www.pexels.com",
    # "https://pixabay.com",
    # "https://www.flickr.com",
    # "https://www.freepik.com"
]

def open_url(url):
    try:
        webbrowser.open(url) 
        logging.info("成功打开: %s", url)
    except Exception as e:
        logging.error("打开 %s 时出错: %s", url, e)

def main():
    threads = []
    # 创建并启动线程打开每个网址
    for url in urls:
        thread = threading.Thread(target=open_url, args=(url,))
        thread.start()
        threads.append(thread)
    # 等待所有线程执行完毕
    for thread in threads:
        thread.join()

if __name__ == '__main__':
    main()
