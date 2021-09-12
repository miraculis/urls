package com.company;

public class UrlsModel {
    private static class A {
        private int size;

        A(int s) {
            size = s;
        }

        int next() {
            return (int) (Math.random() * (size - 1));
        }

        int size() {
            return size;
        }
    }

    private static class Codec {
        String encode(int n) {
            StringBuilder sb = new StringBuilder();
            while (n > 0) {
                char c = toAscii(n % 32);
                sb.append(c);
                n = n / 32;
            }
            return sb.toString();
        }

        private char toAscii(int b) {
            if (b >= 0 && b <= 5)
                return (char) ('0' + b);
            else
                return (char) ('a' + b);
        }

        private int fromAscii(char c) {
            if (c >= '0' && c <= '5')
                return c - '0';
            else if (c >= 'a' && c <= 'z')
                return c - 'a';
            else
                throw new IllegalArgumentException("char is " + c);
        }

        int decode(String code) {
            int n = 0;
            for (int i = code.length() - 1; i >= 0; i--) {
                n = n * 32 + fromAscii(code.charAt(i));
            }
            return n;
        }
    }

    private static class C8A {
        private int a;
        private String sin;

        C8A(int a, String sin) {
            this.a = a;
            this. sin = sin;
        }

        public String toString() {
            return a + ":" + sin;
        }

        public boolean equals(C8A o) {
            if (o == null)
                return false;
            return o.a == a && sin.equals(o.sin);
        }
    }

    private static class Ring {
        private C8A[] data;

        Ring(A a) {
            data = new C8A[a.size()];
        }

        void put(C8A a) {
            data[a.a] = a;
        }

        C8A get(int a) {
            return data[a];
        }
    }

    private static class RandomString {
        public static String generate(Codec c) {
            return c.encode((int) (Math.random() * 1024));
        }
    }

    private static class F {
        private Ring r;
        private A a;

        public F(A a, Ring r) {
            this.a = a;
            this.r = r;
        }

        int f(String sin) {
            C8A c8a = new C8A(a.next(), sin);
            r.put(c8a);
            return c8a.a;
        }
    }

    private static class G {
        private Ring r;
        private Codec c;

        public G(Ring r, Codec c) {
            this.r = r;
            this.c = c;
        }

        String g(String sout) {
            return r.get(c.decode(sout)).sin;
        }
    }
    private static interface Action {
        void act();
    }

    private static void simpleTest() {
        final A a = new A(16);
        final Ring r = new Ring(a);
        final Codec c = new Codec();
        final F f = new F(a, r);
        final G g = new G(r,c);

        Action test = new Action() {
            @Override
            public void act() {
                String in = RandomString.generate(c);
                String back = g.g(c.encode(f.f(in)));
                System.out.println(back.equals(in));
            }
        };

        for (int i = 0; i < 100; i++) {
            test.act();;
        }
    }

    public static void main(String[] args) {
        simpleTest();
    }
}
