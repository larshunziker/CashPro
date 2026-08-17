from locust import HttpLocust, TaskSet, task
import os

AUTH = (os.environ.get('LOCUSTUSER'), os.environ.get('LOCUSTPASSWORD'))

class SimpleLoadBehavior(TaskSet):
    # def on_start(self):
        # """ on_start is called when a Locust start before any task is scheduled """
        # self.login()

    # def on_stop(self):
        # """ on_stop is called when the TaskSet is stopping """
        # self.logout()

    # def login(self):
        # self.client.post("/login", {"username":"ellen_key", "password":"education"})

    # def logout(self):
        # self.client.post("/logout", {"username":"ellen_key", "password":"education"})

    @task(1)
    def index(self):
        self.client.get("/", auth=AUTH)

    # @task(1)
    # def profile(self):
    #    self.client.get("/profile")

class WebsiteUser(HttpLocust):
    task_set = SimpleLoadBehavior
    min_wait = 500
    max_wait = 5000