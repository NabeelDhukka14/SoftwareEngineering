import unittest
from StringsAndWords import findUniqueWords 
 
class TestStringsAndWords(unittest.TestCase):
    def test_unique_words(self):
        self.assertEqual(StringsAndWords.findUniqueWords())

