//equals method should only take one book as argument
package ass1;
public class Book {
		private String title;
		private String author;
		private int pages;
		private String year;
		private int copies;
		public Book(String t,String a,int p,String y,int c){
			title=t;
			author=a;
			pages=p;
			year=y;
			copies=c;
		}
		public String getTitle() {
			return title;
		}
		public void setTitle(String t) {
			title = t;
		}
		public String getAuthor() {
			return author;
		}
		public void setAuthor(String a) {
			author = a;
		}
		public int getPages() {
			return pages;
		}
		public void setPages(int p) {
			pages = p;
		}
		public String getYear() {
			return year;
		}
		public void setYear(String y) {
			year = y;
		}
		public int getCopies() {
			return copies;
		}
		public void setCopies(int c) {
			copies = c;
		}
		public boolean equals(Book B,Book B1) {
			
			if (B.getTitle().equals(B1.getTitle())&& B.getAuthor().equals(B1.getAuthor())&&B.getYear().equals(B1.getYear()))
				return true;

			else
				return false;
		}

		public String toString() {
			return " Title "+getTitle()+" Author: "+getAuthor()+" pages "+getPages()+" Year "+getYear()+"Copies "+getCopies();
		}
	}


