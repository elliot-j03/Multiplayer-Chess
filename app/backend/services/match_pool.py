from collections import deque


class MatchPool():

    def __init__(self):
        self.queue = deque()
        self.queued_players = set()

    def add_plyr(self, user_id):
        if user_id in self.queued_players:
            return False
        
        self.queue.append(user_id)
        self.queued_players.add(user_id)

        # print(f"{self.queue} and {self.queued_players}")

        return self.check_matchup()

    def check_matchup(self):
        if len(self.queue) >= 2:
            plyr_one = self.queue.popleft()
            plyr_two = self.queue.popleft()
            return {"matchFound": True, "plyrOne": plyr_one, "plyrTwo": plyr_two}
        return {"matchFound": False}
    
    def cancel_search(self, user_id):
        try:
            idx = self.queue.index(user_id)

            queue_list = list(self.queue)
            del queue_list[idx]
            self.queue = deque(queue_list)

            self.queued_players.remove(user_id)

            # print(f"{self.queue} and {self.queued_players}")

            return {"cancelSearch": True}
        except Exception as e:
            return {"cancelSearch": False, "detail": e}

    def __str__(self):
        return f"{self.queue}"
    
