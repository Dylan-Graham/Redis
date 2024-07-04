import pandas as pd
import random
import faker

# Initialize faker to generate random data
fake = faker.Faker()

# Constants
POST_SAMPLE_SIZE = 100000
COMMENT_SAMPLE_SIZE = 1000000
POST_BATCH_SIZE_SAMPLE = 100000  # 100k posts per batch
COMMENT_BATCH_SIZE_SAMPLE = 1000000  # 1m comments per batch
NUM_POST_BATCHES_SAMPLE = POST_SAMPLE_SIZE // POST_BATCH_SIZE_SAMPLE
NUM_COMMENT_BATCHES_SAMPLE = COMMENT_SAMPLE_SIZE // COMMENT_BATCH_SIZE_SAMPLE


# Function to generate and save smaller post batches
def generate_post_batches_sample():
    for i in range(NUM_POST_BATCHES_SAMPLE):
        batch_post_data = {
            "user_id": [
                random.randint(1, 10000) for _ in range(POST_BATCH_SIZE_SAMPLE)
            ],
            "title": ["fake_title" for _ in range(POST_BATCH_SIZE_SAMPLE)],
            "content": ["fake_content" for _ in range(POST_BATCH_SIZE_SAMPLE)],
            "created_at": [
                fake.date_time_this_decade() for _ in range(POST_BATCH_SIZE_SAMPLE)
            ],
        }
        batch_post_df = pd.DataFrame(batch_post_data)
        batch_post_df.to_csv(f"./social_posts_batch_sample_{i}.csv", index=False)


# Function to generate and save smaller comment batches
def generate_comment_batches_sample():
    for i in range(NUM_COMMENT_BATCHES_SAMPLE):
        batch_comment_data = {
            "post_id": [
                random.randint(1, POST_SAMPLE_SIZE)
                for _ in range(COMMENT_BATCH_SIZE_SAMPLE)
            ],
            "user_id": [
                random.randint(1, 10000) for _ in range(COMMENT_BATCH_SIZE_SAMPLE)
            ],
            "content": ["fake_content" for _ in range(COMMENT_BATCH_SIZE_SAMPLE)],
            "created_at": [
                fake.date_time_this_decade() for _ in range(COMMENT_BATCH_SIZE_SAMPLE)
            ],
        }
        batch_comment_df = pd.DataFrame(batch_comment_data)
        batch_comment_df.to_csv(f"./social_comments_batch_sample_{i}.csv", index=False)


# Generate and save the smaller post and comment batches
generate_post_batches_sample()
generate_comment_batches_sample()
