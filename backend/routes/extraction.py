import spacy
import random
from spacy.training.example import Example
import numpy as np

# Sample training data: (text, annotations)
# Replace with your own dataset (e.g., project-related text from it-pm repo)
TRAIN_DATA = [
    ("The Horapara project is managed by Kanishka.", {
        "entities": [(4, 12, "PROJECT_NAME")]
    }),
    ("IT-PM system tracks tasks for Horapara.", {
        "entities": [(21, 29, "PROJECT_NAME")]
    }),
    ("Kanishka is working on the IT-PM platform.", {
        "entities": [(26, 31, "PROJECT_NAME")]
    }),
]

def train_ner_model(output_dir="ner_model", n_iter=30):
    # Load a blank English model or use pre-trained 'en_core_web_sm'
    nlp = spacy.blank("en")  # or spacy.load("en_core_web_sm")
    print("Created blank 'en' model")

    # Create the NER pipeline if it doesn't exist
    if "ner" not in nlp.pipe_names:
        ner = nlp.add_pipe("ner")
    else:
        ner = nlp.get_pipe("ner")

    # Add the custom entity label
    ner.add_label("PROJECT_NAME")

    # Disable other pipelines to only train NER
    other_pipes = [pipe for pipe in nlp.pipe_names if pipe != "ner"]
    with nlp.disable_pipes(*other_pipes):
        optimizer = nlp.begin_training()

        # Training loop
        for itn in range(n_iter):
            random.shuffle(TRAIN_DATA)
            losses = {}
            for text, annotations in TRAIN_DATA:
                doc = nlp.make_doc(text)
                example = Example.from_dict(doc, annotations)
                nlp.update([example], drop=0.5, sgd=optimizer, losses=losses)
            print(f"Iteration {itn + 1}, Losses: {losses}")

    # Save the trained model to disk
    nlp.to_disk(output_dir)
    print(f"Saved model to {output_dir}")

def test_model(model_dir="ner_model"):
    # Load the trained model
    nlp = spacy.load(model_dir)
    
    # Test the model
    test_text = "Kanishka is developing the Horapara and IT-PM projects."
    doc = nlp(test_text)
    
    print("\nEntities found:")
    for ent in doc.ents:
        print(f"{ent.text} -> {ent.label_}")

if __name__ == "__main__":
    # Train the model
    train_ner_model(output_dir="/Users/kanishka/horapara/ner_model", n_iter=30)
    
    # Test the trained model
    test_model(model_dir="/Users/kanishka/horapara/ner_model")